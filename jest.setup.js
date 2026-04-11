// Set default environment variables for tests
if (!process.env.SERVER_URL) {
  // Default to localhost:8080 for Docker environments, localhost:3000 for local dev
  process.env.SERVER_URL = process.env.PORT 
    ? `http://localhost:${process.env.PORT}`
    : 'http://localhost:3000';
}
