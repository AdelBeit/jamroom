const debugLog = (...args: unknown[]) => {
  if (process.env.NEXT_PUBLIC_DEBUG === "true") {
    console.log("[debug]", ...args);
  }
};

export default debugLog;
