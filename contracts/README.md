# Contracts

`openapi.yaml` is the cross-stack API contract.

- Source of truth is the running Spring Boot app (`springdoc-openapi` serves `/v3/api-docs`).
- Export it here: `./scripts/codegen.sh` (or `pnpm codegen`).

> Status: placeholder — no API endpoints yet, so no `openapi.yaml` is committed.
> The drift-check workflow skips when the file is absent; first real endpoint triggers codegen.
- CI fails if the committed spec drifts from the live one (`codegen-check.yml`).
- Frontend types are generated from this file into `packages/api-client` via `openapi-typescript`.
