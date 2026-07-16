# Controller API — Release 10 Local Prototype

This is a local-only FastAPI prototype for Blackspire Helix Command Core.

## Endpoints

- `GET /health` returns a typed health response.
- `GET /ready` returns a typed readiness response.

## Boundaries

- No production deployment.
- No real secrets.
- No live endpoints.
- No paid APIs.
- No Telegram production bot.
- No GitHub tokens.
- No server IPs.
- No broker or trading integrations.

## Local run command for a future prepared environment

```bash
uvicorn controller_api.main:app --reload --host 127.0.0.1 --port 8000
```

This release does not install or run FastAPI in production.
