# Quizez Folder Structure — Enterprise Recommendations

> Tổng hợp từ 3 research reports (2026-09-18). Nguyên tắc chung: **group by domain, thin plumbing, defer shared libs đến khi có consumer thứ 2**.

## 1. Top-level (giữ nguyên + 3 dir mới)

```
quizez/
├── apps/
│   ├── api/                  # Spring Boot 4.1 (Gradle Kotlin DSL, wrapper riêng)
│   └── web/                  # Next.js 16
├── packages/
│   ├── tsconfig/             # ✅ làm ngay — rẻ, chuẩn hoá strictness
│   └── api-client/           # ✅ làm ngay — types sinh từ OpenAPI (springdoc → openapi-typescript)
│   # ui/ — ❌ DEFER đến khi có app thứ 2 (ext phase-2, mobile)
├── contracts/
│   └── openapi.yaml          # spec do springdoc emit, commit, CI check drift
├── infra/                    # 🆕 k8s/helm/terraform khi có target deploy thật
├── scripts/                  # 🆕 dev.sh, codegen.sh, seed.sh (người chạy)
├── docs/                     # đã có — thêm ADRs khi quyết định kiến trúc lớn
├── .github/workflows/        # tách ci-api.yml / ci-web.yml / codegen-check.yml khi CI phình
├── docker-compose.yml        # giữ ở root; chuyển infra/docker/ khi có nhiều override
└── pnpm-workspace.yaml       # apps/* + packages/* (đã đúng)
```

**Không dùng Turborepo/Nx lúc này.** Turbo không hiểu Gradle (phải wrap bằng stub package.json — indirection vô ích). Nx native Gradle là upgrade path đúng khi CI chậm hoặc module nhiều. Bằng chứng: Keycloak, Camunda (Maven+pnpm scale lớn) đều không dùng JS orchestrator — CI compose native tools.

## 2. Backend — package-by-feature + Modulith

**Quyết định: feature package + `internal/` ẩn, single Gradle module, Spring Modulith verify boundaries.** Không package-by-layer (legacy), không full hexagonal (2-3x boilerplate), không Gradle multi-module (premature).

```
apps/api/src/main/java/com/quizez/api/
├── ApiApplication.java
├── config/                  # @Configuration: Security, Jackson, OpenAPI
├── common/                  # shared kernel <5% codebase: error (ProblemDetail RFC 7807),
│                            # web (pagination), event contracts, persistence (BaseEntity)
├── auth/  wordsets/  paths/  study/  srs/  dict/   # phase-2: ai/ conv/ class/ gam/ prem/
│   ├── XxxController.java   # public API surface
│   ├── XxxService.java      # bean các module khác dùng
│   ├── Xxx.java             # domain type expose (nếu cần)
│   ├── dto/                 # request/response records
│   └── internal/            # entities, repos, mappers — Modulith ẩn
├── infra/                   # adapter không có domain owner (external dict client...)
└── # test mirror main tree + ArchitectureTests.java (Modulith verify()) +
    # @ApplicationModuleTest + Testcontainers Postgres
```

Quy tắc: feature nhỏ giữ flat trong root (Modulith "simple module"); feature lớn dùng `dto/` + `internal/`. Entities-as-domain (không double-mapping). Event giao tiếp liên module. Migrations `db/migration/V{n}__{desc}.sql`, append-only.

## 3. Frontend — feature-sliced + thin router

**Quyết định: `src/features/<domain>/`, `app/` chỉ chứa routes, shared code promote khi có usage thứ 2.**

```
apps/web/src/
├── app/                     # ROUTES ONLY
│   ├── (marketing)/         # public pages, layout riêng
│   ├── (auth)/              # login/register, layout centered
│   ├── (app)/               # authenticated shell + dashboard/wordsets/paths/study/settings
│   └── api/                 # route handlers CHỈ cho OAuth callback/webhook/health
├── features/                # mirrors API domains
│   └── auth/  wordsets/  paths/  study/  srs/  dict/
│       └── { components/  actions.ts  api.ts  queries.ts  schemas.ts  types.ts }
├── components/  lib/  hooks/  stores/  types/   # shared, domain-agnostic
└── middleware.ts            # auth gate, edge-safe
```

Quy tắc: UI mutation → Server Actions trong `features/<d>/actions.ts`; route handlers chỉ cho HTTP endpoint thật; RSC gọi `features/<d>/api.ts` trực tiếp. Import 1 chiều `app → features → shared`; **features không import nhau** — enforce bằng `eslint-plugin-boundaries` từ ngày 1.

## 4. Thứ tự áp dụng

1. `packages/tsconfig/` + `contracts/` + `scripts/` — ngay
2. Backend `internal/` convention + Modulith dep + `ArchitectureTests` — khi viết UC-AUTH đầu tiên
3. Frontend `features/` + route groups + boundary lint — khi viết page đầu tiên
4. `packages/api-client` + springdoc + CI drift check — khi endpoint đầu tiên ổn định
5. `infra/` manifests, `.github/actions/` — khi cần
6. `packages/ui`, Nx — khi có app/consumer thứ 2

## Nguồn

- Backend: Spring Modulith docs, spring.io blog 2022-10-21, petclinic (feature) vs petclinic-rest (layer), buckpal, JHipster sample
- Frontend: dubinc/dub, calcom/cal.com, bulletproof-react, supabase studio, vercel/commerce, Next.js docs
- Monorepo: Turborepo structuring docs, Nx @nx/gradle, keycloak/keycloak, camunda/camunda, springdoc-openapi, openapi-typescript
