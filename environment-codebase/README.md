# Privacy Range 

A self-contained training environment for identifying GDPR-related privacy problems in web applications. It is built as a fictitious online shop (*Private Piranha Pics*) with **13 intentionally embedded privacy issues** of varying difficulty and discoverability.

This repository contains the current, deployable version of the environment. The version used during the study is archived at the Wayback Machine: https://web.archive.org/web/20260304133114/https://private-piranha.pics/

Supplementary materials (problem descriptions, rubric, handout, walkthrough) are available separately.

---

## Architecture Overview

The environment consists of several interconnected services, all containerised with Docker.

### Core Services

| Service | Technology | Purpose |
|---------|------------|---------|
| Shop frontend | Nuxt 4 (SSR, full-stack) | The main training environment, a fictitious online shop |
| Database | PostgreSQL 16 | Persistent storage for products, users, orders, and reviews |
| Project website | Nuxt 4 (static, generated) | Hosts the quick-start guide, walkthrough, and handout |

The shop is a full-stack Nuxt 4 application with server-side rendering. Content management, user authentication, and all API endpoints are handled directly by Nuxt's server layer (Nitro), using Drizzle ORM to communicate with PostgreSQL. Authentication is provided by `nuxt-auth-utils`.

The project website is statically generated (`nuxt generate`) and served via Nginx.

### Simulated Third-Party Services

These services simulate external third parties to create realistic privacy problems. They are intentionally minimal as they only need to accept requests, not process them.

| Service | Role | Privacy problem |
|---------|------|-----------------|
| Font service | Serves the shop's Inter font stylesheet from a "third-party" host | H3 |
| Cloud storage | Hosts the shop's trailer video | H2 |
| Tracking service | Receives POST requests for user interaction data | H4 |
| Form service | Receives form field data on every keystroke | H5 |

All four are Nginx containers serving static placeholder pages and (for the tracking/form services) accepting POST requests.

### Analytics

A self-hosted Plausible instance was used during the original study for cookie-free analytics. The Plausible script URL is injected into the shop via the `PUBLIC_PLAUSIBLE_SCRIPT` environment variable. Leaving this variable unset disables analytics without affecting any other functionality. The Plausible deployment uses the official Plausible docker-compose setup and is managed separately from this repository's compose file.

### Infrastructure

All domains and SSL certificates are managed by a two-container reverse proxy setup (`nginxproxy/nginx-proxy` + `nginxproxy/acme-companion`). Let's Encrypt certificates are issued and renewed automatically.

### Scheduled Tasks

The shop backend runs Nitro server tasks on a schedule (production only):

| Cron | Task | Effect |
|------|------|--------|
| `0 6 * * *` | `db:reset`, `db:seed` | Resets and re-seeds the database daily at 06:00 |
| `15 * * * *` | `order:deliver` | Marks pending orders as delivered every hour |

---

## Deployment

### Prerequisites

- Docker and Docker Compose
- Six domains (or subdomains) pointed at the host machine via DNS A records
- A valid email address for Let's Encrypt

### 1. Configure the root `.env`

```bash
cp .env.example .env
```

Edit `.env` and set all values:

```
EMAIL=admin@example.com

MAIN_DOMAIN=store.yourdomain.com
PROJECT_DOMAIN=project.yourdomain.com
FONT_DOMAIN=font.yourdomain.com
VIDEO_DOMAIN=video.yourdomain.com
TRACKING_DOMAIN=tracking.yourdomain.com
FORM_DOMAIN=forms.yourdomain.com
```

### 2. Configure the shop application's `.env`

```bash
cp challenge/.env.example challenge/.env
```

Edit `challenge/.env` and set all values to match the domains above. The `NUXT_SESSION_PASSWORD` must be a random string of at least 32 characters:

```bash
openssl rand -base64 32
```

### 3. Start the containers

```bash
docker compose up -d
```

This brings up all services: reverse proxy, database, shop, project website, and all four simulated third-party services (9 containers total).

### Local Development / Testing

For local testing, add entries to `/etc/hosts` instead of configuring DNS:

```
127.0.0.1 store.yourdomain.com
127.0.0.1 project.yourdomain.com
127.0.0.1 font.yourdomain.com
127.0.0.1 video.yourdomain.com
127.0.0.1 tracking.yourdomain.com
127.0.0.1 forms.yourdomain.com
```

For developing the shop application locally (outside Docker):

```bash
cd challenge
cp .env.example .env   # edit as needed
npm install
npm run dev
```

---

## Changes from the Original (Nuxt 2 + Strapi) Version

The version used during the study ran on a Nuxt 2 / Strapi stack. This repository reflects the post-study migration to a more maintainable, modern stack. The privacy problems and their implementations are identical; only the underlying technology changed.

| Aspect | Original (study version) | This version |
|--------|--------------------------|--------------|
| Shop framework | Nuxt 2 (`nuxt.config.js`) | Nuxt 4 (`nuxt.config.ts`) |
| Backend / CMS | Strapi v4 (separate Node.js service) | Nitro (built into Nuxt 4) |
| Authentication | Strapi built-in user management | `nuxt-auth-utils` |
| Database access | Strapi ORM via REST API | Drizzle ORM (direct PostgreSQL) |
| Styling | Custom CSS + Tailwind CSS v2 | Tailwind CSS v4 + daisyUI v5 + `@nuxt/ui` |
| Project website | Nuxt 2 (separate repo/container) | Nuxt 4 static (`nuxt generate`) |
| Container count | 10 (incl. Strapi) | 9 |
| Config surface | `nuxt.config.js` + Strapi admin panel | `nuxt.config.ts` + `.env` files only |

**Removed from original setup:**
- Strapi backend container and its separate database
- Strapi admin panel (content was migrated to seed scripts and JSON files)
- `cookieHelper.js` plugin (replaced by `nuxt-auth-utils` session handling)
- Old Nuxt 2 layout/plugin/pages structure

**Kept identical (by design):**
- All 13 privacy problems and their technical implementations
- Third-party service simulation (font, video, tracking, forms)
- Nginx reverse proxy + Let's Encrypt setup
- Database reset and re-seeding schedule
- Problem walkthrough content

---

## Repository Structure

```
.
├── challenge/          # Shop application (Nuxt 4, SSR)
│   ├── app/            # Pages, components, layouts, assets
│   ├── server/         # API routes, database, tasks (Nitro)
│   ├── shared/         # Shared types
│   ├── Dockerfile
│   └── .env.example    # ← copy to .env and fill in before deploying
├── project/            # Project website (Nuxt 4, static)
│   ├── pages/          # Handout, walkthrough, index
│   └── Dockerfile
├── fontideas/          # Simulated font service (Nginx)
├── krimskramskarton/   # Simulated video/cloud storage (Nginx)
├── audeinces/          # Simulated tracking service (Nginx)
├── buildyourforms/     # Simulated form service (Nginx)
├── environment/        # Technical documentation
│   └── README.md       # Detailed architecture and deployment notes
├── docker-compose.yml
└── .env.example        # ← copy to .env and fill in before deploying
```

---


## Design

The shop uses Tailwind CSS v4, daisyUI v5, and `@nuxt/ui` v4. Icons from [Tabler Icons](https://tabler-icons.io/) and [Flaticon](https://www.flaticon.com/). Piranha images generated with [Craiyon](https://www.craiyon.com/). The project website uses Tailwind CSS v3 with the Typography plugin.
