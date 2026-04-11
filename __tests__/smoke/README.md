# Smoke Tests

Automated tests for critical functionality.

## Zero-downtime Reload Verification

Tests that Socket.io connections survive Caddy reload without dropping or requiring reconnection.

### What it tests

- Connects multiple Socket.io clients
- Triggers `caddy reload` (simulates dynamic upstream changes)
- Monitors for any `disconnect` or `reconnect_attempt` events during reload
- **Pass**: 0 disconnects, 0 reconnects (reload is completely transparent)
- **Fail**: Any disconnects/reconnects (reload broke something)

### Running locally

```bash
# In docker-compose environment
docker-compose exec app yarn test:smoke

# Or directly (requires server running on localhost:3000)
SERVER_URL=http://localhost:3000 yarn test:smoke
```

### How it works

1. **Setup**: Connects 5 Socket.io clients with auth
2. **Baseline**: Verifies all clients connected successfully
3. **Trigger reload**: Runs `caddy reload -c /etc/caddy/Caddyfile`
4. **Monitor**: Watches disconnect/reconnect events for 10 seconds
5. **Verify**: Asserts 0 drops during reload window

### Expected behavior

```
✓ All 5 clients connected

🔄 Triggering caddy reload...
✓ Caddy reload triggered

⏳ Monitoring sockets for 10s during reload...

📊 Reload verification results:
  ✓ OK client-0: disconnects=0, reconnects=0
  ✓ OK client-1: disconnects=0, reconnects=0
  ...

📈 Summary: 0 disconnects, 0 reconnect attempts
```

### Troubleshooting

- **"Could not trigger caddy reload"**: Test is running outside docker or without permissions to run caddy. This is OK - the test will still monitor events but won't actually trigger a reload.
- **Clients fail to connect**: Check that Socket.io server is running and accessible at SERVER_URL
- **Reconnects detected**: Indicates reload wasn't graceful - check Caddy/app logs
