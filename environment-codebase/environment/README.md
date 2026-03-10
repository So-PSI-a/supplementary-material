# Privacy Range Environment

The Privacy Range is a self-contained web application designed as a training environment for identifying GDPR-related privacy problems. It is built as a fictitious online shop ("Private Piranha Pics") with 13 intentionally embedded privacy issues of varying difficulty and discoverability.

> **Note:** This codebase has been updated for compatibility with current dependencies. The version used during the study is archived at: https://web.archive.org/web/20260304133114/https://private-piranha.pics/

## Architecture Overview

The environment consists of several interconnected services, all containerized with Docker for easy deployment.

### Core Services

| Service | Domain | Technology | Purpose |
|---------|--------|------------|---------|
| Shop frontend | private-piranha.pics | Nuxt 4 (SSR, full-stack) | The main training environment — a fictitious online shop |
| Database | — | PostgreSQL 16 | Persistent storage for products, users, orders, and reviews |
| Project website | project.private-piranha.pics | Nuxt 4 (static, generated) | Hosts the quick start guide, walkthrough, and handout |

The shop frontend is a full-stack Nuxt 4 application with server-side rendering. Unlike the pre-migration version, there is no separate CMS — content management, user authentication, and all API endpoints are handled directly by Nuxt's server layer (Nitro), using Drizzle ORM to communicate with PostgreSQL. Authentication is provided by `nuxt-auth-utils`.

The project website is a statically generated Nuxt 4 application, built with `nuxt generate` and served via Nginx. It provides the GDPR handout, a full walkthrough of all 13 privacy problems, and a link to the training environment.

#### Scheduled Tasks

The shop backend runs Nitro server tasks on a schedule:

| Cron | Task | Effect |
|------|------|--------|
| `0 6 * * *` | `db:reset`, `db:seed` | Resets and re-seeds the database daily at 06:00 |
| `15 * * * *` | `order:deliver` | Marks pending orders as delivered every hour at :15 |

These tasks are only active in production (`NODE_ENV=production`).

### Simulated Third-Party Services

These services simulate external third parties to create realistic privacy problems. They are not functional services — they exist to receive requests and demonstrate privacy-relevant behavior.

| Service | Domain | Purpose | Implementation |
|---------|--------|---------|----------------|
| Font service | fontinspire.com | Serves the shop's main font from a "third-party" server (H3) | Nginx; serves `inter.css` and font files from root directory |
| Cloud storage | krimskramskarton.de | Hosts the shop's trailer video (H2) | Nginx; serves video from root directory |
| Tracking service | audeinces.com | Receives POST requests for user interaction tracking (H4) | Nginx; accepts POST requests |
| Form service | buildyourforms.com | Receives form data before submission (H5) | Nginx; accepts POST requests |

Both fontinspire.com and krimskramskarton.de show a "We're down for maintenance" placeholder. The tracking and form services show a "Service is behaving normal" placeholder. These are intentionally minimal — they only need to accept requests, not process them.

The font and video URLs, tracking endpoint, and form endpoint are all configured via environment variables in `challenge/.env` (see `nuxt.config.ts` `runtimeConfig.public` for the variable names).

### Analytics

| Service | Domain | Technology | Purpose |
|---------|--------|------------|---------|
| Analytics | analytics0815.com | Plausible (self-hosted) | Cookie-free analytics integrated into the shop and project site |

Plausible is a privacy-friendly analytics tool that does not require consent. It was used during the original study to collect real usage data. The deployment uses the official Plausible docker-compose setup (4 containers), managed separately from the main compose file. The Plausible script URL is injected into the shop via the `PUBLIC_PLAUSIBLE_SCRIPT` environment variable; leaving this variable unset disables analytics without affecting any other functionality.

### Infrastructure

Routing for all domains and SSL certificate management is handled by a two-container reverse proxy setup (`nginxproxy/nginx-proxy` + `nginxproxy/acme-companion`). The acme-companion handles automatic Let's Encrypt certificate issuance and renewal. The contact email for certificates is configured via the `EMAIL` variable in the root `.env`.

## Design

The shop frontend uses Tailwind CSS v4, daisyUI v5, and `@nuxt/ui` v4 for styling. Icons are sourced from [Tabler Icons](https://tabler-icons.io/) and [Flaticon](https://www.flaticon.com/). Piranha images were generated using [Craiyon](https://www.craiyon.com/). The project website uses Tailwind CSS v3 with the Typography plugin.

## Deployment

### Prerequisites

- Docker and Docker Compose
- Custom domain configuration (see below)
- A valid email address for Let's Encrypt (set `EMAIL` in the root `.env`)

### Configuration

The root `.env` file controls the main deployment parameters:

```
EMAIL=admin@example.com
MAIN_DOMAIN=private-piranha.pics
PROJECT_DOMAIN=project.private-piranha.pics
FONT_DOMAIN=fontinspire.com
VIDEO_DOMAIN=krimskramskarton.de
TRACKING_DOMAIN=audeinces.com
FORM_DOMAIN=buildyourforms.com
```

The `challenge/.env` file configures the shop application. All variables are commented out by default — copy and fill them in before deployment:

```
PUBLIC_MAIN_DOMAIN=private-piranha.pics
PUBLIC_FONT_URL=https://fontinspire.com/inter.css
PUBLIC_PLAUSIBLE_SCRIPT=https://analytics0815.com/plausible.js
PUBLIC_STONED_PIRANHA_VIDEO_URL=https://krimskramskarton.de/stoned-piranha-trailer.mp4
PUBLIC_LEAKY_FORMS_ENDPOINT=https://buildyourforms.com
PUBLIC_TRACKING_ENDPOINT=https://audeinces.com
DATABASE_URL=postgres://postgres:postgres@db:5432/privatepiranha
POSTGRES_URL=postgres://postgres:postgres@db:5432/privatepiranha
NUXT_SESSION_PASSWORD=<random 32+ char string>
```

### Deployment

```bash
docker compose up -d
```

This brings up all services: the reverse proxy, database, shop, project website, and all four simulated third-party services.

### Domain Configuration

The environment requires the following domains to be configured and pointed at the host machine:

- `private-piranha.pics`
- `project.private-piranha.pics`
- `fontinspire.com`
- `krimskramskarton.de`
- `audeinces.com`
- `buildyourforms.com`

For local development or testing, these can be mapped via `/etc/hosts`. For production deployment, DNS records must point to the host machine — SSL certificates are issued automatically by the acme-companion container.

## Container Overview

| Container(s) | Service |
|---------------|---------|
| 1 × Node.js 20 (custom, SSR) | private-piranha.pics (shop + API) |
| 1 × PostgreSQL 16 | Database |
| 1 × Nginx (custom, static) | project.private-piranha.pics |
| 1 × Nginx | fontinspire.com |
| 1 × Nginx | krimskramskarton.de |
| 1 × Nginx | audeinces.com |
| 1 × Nginx | buildyourforms.com |
| 2 × (reverse proxy) | Routing + SSL |

Total: 9 containers.

## Known Issues

**`challenge/Dockerfile` typo**: Line 6 contains `ENV DATABASE_URL=$POSTGRES_URLd` — the trailing `d` is a typo and this line has no effect. The correct `DATABASE_URL` is set at runtime via `docker-compose.yml` and this does not affect deployment.

## Implemented Problems

For a full description of all 13 problems, their legal background, and suggested solutions, see `problems_and_rubric.pdf` in the supplementary material root directory. The walkthrough page (`walkthrough_problem_explanations.pdf`) contains the problem explanations as presented to study participants.
