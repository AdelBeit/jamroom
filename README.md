## Jamroom

Virtual music jam room PWA. Made for mobile. Gather your friends and play the keyboard or the drums together.

[Play Here](https://jam.adelbeit.com)

## Features:

- PWA
- Customizable drumpads
- Multiplayer, invite your friends through the users dropdown
- Scrollable full keyboard
- Playable offline

Powered by:

- Typescript
- ReactJS
- NextJS
- Socket.io (Websocket)
- Redis (pub/sub adapter for multi-instance broadcasting)
- Docker / Docker Compose
- ToneJS (Web Audio API)
- Zustand

## Running locally

```bash
cp .env.example .env
# fill in REDIS_PASSWORD and REDIS_URL in .env
docker compose up
```

## Deploy

- CI builds and pushes `ghcr.io/adelbeit/jamroom:<sha>` on each `main` push.
- Deploy SSH writes `IMAGE_TAG=<sha>` to `/opt/jamroom/.env`, then runs `docker compose pull app && docker compose up -d`.
- Rollback: set `IMAGE_TAG` to a prior SHA and run `docker compose up -d`.

[Figma File](https://www.figma.com/file/mL6jPwkLXq2MvPu1FzyQnt/Music-App?node-id=0%3A1)
