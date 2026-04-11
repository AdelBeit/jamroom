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

  console.log(`[Consul] Preparing service registration`);
  console.log(`[Consul]   ID: ${SERVICE_ID}`);
  console.log(`[Consul]   Name: ${SERVICE_NAME}`);
  console.log(`[Consul]   Address: ${SERVICE_ADDRESS}:${SERVICE_PORT}`);
  console.log(`[Consul]   Health check: ${HEALTH_CHECK_URL}`);
  console.log(`[Consul]   Server: ${CONSUL_HTTP_ADDR}`);

  return new Promise((resolve, reject) => {
    const hostname = CONSUL_HTTP_ADDR.split(":")[0];
    const port = parseInt(CONSUL_HTTP_ADDR.split(":")[1] || "8500", 10);

    const options = {
      hostname,
      port,
      path: "/v1/agent/service/register",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(`[Consul] Sending registration to ${hostname}:${port}...`);

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(`[Consul] Response status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          registrationId = SERVICE_ID;
          console.log(`[Consul] ✓ Successfully registered with Consul!`);
          resolve();
        } else {
          console.error(`[Consul] ✗ Registration failed: ${data}`);
          reject(new Error(`Consul registration failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error(`[Consul] ✗ Network error:`, error instanceof Error ? error.message : error);
      reject(error);
    });

    console.log(`[Consul] Writing payload...`);
    req.write(JSON.stringify(registration));
    req.end();
  });
}

export async function deregisterFromConsul(): Promise<void> {
  if (!registrationId) return;

  return new Promise((resolve, reject) => {
    const hostname = CONSUL_HTTP_ADDR.split(":")[0];
    const port = parseInt(CONSUL_HTTP_ADDR.split(":")[1] || "8500", 10);

    const options = {
      hostname,
      port,
      path: `/v1/agent/service/deregister/${registrationId}`,
      method: "PUT",
    };

    console.log(`[Consul] Deregistering ${registrationId}...`);

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          registrationId = null;
          console.log(`[Consul] ✓ Deregistered`);
          resolve();
        } else {
          console.error(`[Consul] ✗ Deregistration failed: ${data}`);
          reject(new Error(`Consul deregistration failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error(`[Consul] ✗ Deregistration error:`, error);
      reject(error);
    });

    req.end();
  });
}
