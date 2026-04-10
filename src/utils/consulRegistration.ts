import http from "http";
import debugLog from "./debugLog";

interface ConsulServiceRegistration {
  ID: string;
  Name: string;
  Tags: string[];
  Address: string;
  Port: number;
  Check: {
    HTTP: string;
    Interval: string;
    Timeout: string;
    DeregisterCriticalServiceAfter: string;
  };
}

const CONSUL_HTTP_ADDR = process.env.CONSUL_HTTP_ADDR || "localhost:8500";
const SERVICE_NAME = "jamroom-app";
const SERVICE_PORT = parseInt(process.env.PORT || "3000", 10);
const SERVICE_ID = `${SERVICE_NAME}-${process.env.HOSTNAME || "local"}-${SERVICE_PORT}`;
const SERVICE_ADDRESS = process.env.SERVICE_ADDRESS || "localhost";
const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || `http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/health`;

let registrationId: string | null = null;

export async function registerWithConsul(): Promise<void> {
  const registration: ConsulServiceRegistration = {
    ID: SERVICE_ID,
    Name: SERVICE_NAME,
    Tags: ["web", "socket.io"],
    Address: SERVICE_ADDRESS,
    Port: SERVICE_PORT,
    Check: {
      HTTP: HEALTH_CHECK_URL,
      Interval: "10s",
      Timeout: "5s",
      DeregisterCriticalServiceAfter: "30s",
    },
  };

  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONSUL_HTTP_ADDR.split(":")[0],
      port: parseInt(CONSUL_HTTP_ADDR.split(":")[1] || "8500", 10),
      path: "/v1/agent/service/register",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          registrationId = SERVICE_ID;
          debugLog(`✓ Registered with Consul as ${SERVICE_ID}`);
          resolve();
        } else {
          reject(new Error(`Consul registration failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error("Consul registration error:", error);
      reject(error);
    });

    req.write(JSON.stringify(registration));
    req.end();
  });
}

export async function deregisterFromConsul(): Promise<void> {
  if (!registrationId) return;

  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONSUL_HTTP_ADDR.split(":")[0],
      port: parseInt(CONSUL_HTTP_ADDR.split(":")[1] || "8500", 10),
      path: `/v1/agent/service/deregister/${registrationId}`,
      method: "PUT",
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          registrationId = null;
          debugLog(`✓ Deregistered from Consul`);
          resolve();
        } else {
          reject(new Error(`Consul deregistration failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error("Consul deregistration error:", error);
      reject(error);
    });

    req.end();
  });
}
