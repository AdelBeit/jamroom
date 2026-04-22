#!/usr/bin/env node
/**
 * Initialize Consul registration, then start Next.js
 * Simple startup script - registers with Consul before starting the app
 */

const http = require("http");
const { spawn } = require("child_process");

const CONSUL_HTTP_ADDR = process.env.CONSUL_HTTP_ADDR || "localhost:8500";
const SERVICE_NAME = "jamroom-app";
const SERVICE_PORT = parseInt(process.env.PORT || "3000", 10);
const SERVICE_ID = `${SERVICE_NAME}-${process.env.HOSTNAME || "local"}-${SERVICE_PORT}`;
const SERVICE_ADDRESS = process.env.SERVICE_ADDRESS || "localhost";
const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || `http://${SERVICE_ADDRESS}:${SERVICE_PORT}/api/health`;

console.log("[Init] Starting initialization...");

async function registerWithConsul() {
  const registration = {
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

  console.log("[Consul] Preparing service registration");
  console.log(`[Consul]   ID: ${SERVICE_ID}`);
  console.log(`[Consul]   Name: ${SERVICE_NAME}`);
  console.log(`[Consul]   Address: ${SERVICE_ADDRESS}:${SERVICE_PORT}`);
  console.log(`[Consul]   Health check: ${HEALTH_CHECK_URL}`);
  console.log(`[Consul]   Server: ${CONSUL_HTTP_ADDR}`);

  return new Promise((resolve, reject) => {
    const [hostname, port] = CONSUL_HTTP_ADDR.split(":");
    const options = {
      hostname,
      port: parseInt(port || "8500", 10),
      path: "/v1/agent/service/register",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    console.log(`[Consul] Sending registration to ${hostname}:${port || 8500}...`);

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode === 200) {
          console.log(`[Consul] ✓ Successfully registered with Consul!`);
          resolve();
        } else {
          reject(new Error(`Consul registration failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error(`[Consul] ✗ Network error:`, error.message);
      reject(error);
    });

    req.write(JSON.stringify(registration));
    req.end();
  });
}

async function startApp() {
  console.log("[Init] Registering with Consul...");
  try {
    await registerWithConsul();
  } catch (error) {
    console.warn("[Init] ⚠️  Consul registration failed (non-critical):", error.message);
    console.warn("[Init] Continuing without Consul registration...");
  }

  console.log("[Init] Starting Next.js app...");
  const nextStart = spawn("yarn", ["next", "start"], {
    stdio: "inherit",
    env: { ...process.env },
  });

  // Handle shutdown signals
  process.on("SIGTERM", () => {
    console.log("[Init] SIGTERM received, shutting down...");
    nextStart.kill("SIGTERM");
    process.exit(0);
  });

  process.on("SIGINT", () => {
    console.log("[Init] SIGINT received, shutting down...");
    nextStart.kill("SIGINT");
    process.exit(0);
  });

  nextStart.on("exit", (code) => {
    console.log("[Init] Next.js app exited with code", code);
    process.exit(code);
  });
}

startApp().catch((error) => {
  console.error("[Init] Fatal error:", error);
  process.exit(1);
});
