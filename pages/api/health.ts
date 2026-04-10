import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const healthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      return res.status(500).json({ status: "error", message: "REDIS_URL not configured" });
    }

    // Check Redis connectivity
    const redis = new Redis(redisUrl);
    await redis.ping();
    redis.disconnect();

    // If we got here, app and Redis are both healthy
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default healthHandler;
