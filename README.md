# URL Shortner

This project includes a PostgreSQL database service managed by Docker Compose and a Next.js application. Follow the steps below to set up and run both services.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed (usually included with Docker Desktop)
- Node.js installed on your machine

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:defsanmith/url-shortner.git
cd url-shortner
```

### 2. Set Up the Database Service

This project uses a PostgreSQL database containerized with Docker. The configuration is defined in the `docker-compose.yml` file.

### 3. Run the Database Service

To start the PostgreSQL service, use the following command:

```bash
docker-compose up -d
```

This command will:

- Download the PostgreSQL Docker image (if not already downloaded).
- Start the PostgreSQL container.
- Mount the `./data` directory on your local machine to the container's data directory (`/var/lib/postgresql/data`), ensuring persistent data storage.
- Expose the database on port `5432`.

### 4. Run the Next.js Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### 5. Access the Database

Once the PostgreSQL container is running, you can connect to the database using a database client (e.g., `psql`, DBeaver, or any other PostgreSQL-compatible tool) with the following credentials:

# Prune Web Service (URL Shortener)

A small, opinionated URL shortener built with Next.js and Prisma. It provides a web UI to create short URLs, redirects users to the original URL, and records simple redirect logs for analytics.

Key features

- Shorten URLs with a generated short hash
- Track hits and store redirect logs (referer, user agent, IP)
- Authentication-ready (uses NextAuth + Prisma models)
- Uses PostgreSQL for persistence and Prisma as ORM

Tech stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Prisma 5 + @prisma/client
- PostgreSQL (containerized via Docker Compose)
- Tailwind CSS, Radix UI components
- NextAuth for authentication (models included in Prisma schema)

Repository layout (high level)

- `app/` — Next.js app entry (routes, pages, layout)
- `components/` — UI components (home, stats, UI primitives)
- `src/lib/` — helpers (Prisma client, hash generator, utils)
- `prisma/schema.prisma` — Prisma schema and models
- `docker-compose.yml` — PostgreSQL service for local development
- `data/` — PostgreSQL data directory (mapped from container)

Getting started

Prerequisites

- Node.js (v18+ recommended)
- npm / pnpm / yarn
- Docker (for the local PostgreSQL instance)

1) Start the database (optional — you can use an external DB)

The repository includes a `docker-compose.yml` that starts a PostgreSQL container. From the project root:

```bash
docker-compose up -d
```

The compose file in this project uses these defaults:

- POSTGRES_USER=root
- POSTGRES_PASSWORD=qwedsa
- POSTGRES_DB=public
- host port: 5432

The Postgres data directory is mounted to `./data` so data persists between runs.

2) Create a `.env` file

Create a `.env` in the project root with at least a `DATABASE_URL` value so Prisma and the app can connect. Example for the included Docker DB:

```env
DATABASE_URL="postgresql://root:qwedsa@localhost:5432/public?schema=public"
NEXTAUTH_URL="http://localhost:3000"
# (optional) NEXTAUTH_SECRET="some_secure_random_value"
```

3) Install dependencies

```bash
npm install
# or
pnpm install
```

4) Generate Prisma client and run migrations

The project exposes the following scripts in `package.json`:

- `npm run generate` — runs `prisma generate` to produce the Prisma client
- `npm run migrate:dev` — runs `prisma migrate dev` to apply migrations (interactive)

Run:

```bash
npm run generate
npx prisma migrate dev --name init
```

5) Run the development server

```bash
npm run dev
```

Open <http://localhost:3000> to view the application.

Prisma schema and data model (summary)

The main models in `prisma/schema.prisma` are:

- `User`, `Account`, `Session`, `VerificationToken`: standard NextAuth-compatible models
- `Authenticator`: optional model for WebAuthn support
- `Url`: stores shortened URLs with `id`, `url`, `slug`, `hits`, timestamps
- `RedirectLog`: stores logs for each redirect (referer, user agent, ip, createdAt)

The Prisma client is instantiated in `src/lib/prisma.ts` and uses a long-lived instance in development to avoid excessive connections.

Short hash generation

Short hashes used for slugs are generated by `src/lib/generateHash.ts`. The default length is 6 and the function uses `crypto.randomBytes` to produce URL-safe mixed-case alphanumeric hashes.

Docker / Production notes

- The repository includes a local `docker-compose.yml` for easy local Postgres setup. For production, use a managed PostgreSQL instance or a hardened container setup.
- Make sure to set secure credentials, rotate `NEXTAUTH_SECRET`, and use HTTPS in production.
- Build the project for production with `npm run build` and run it with `npm start`.

Useful scripts

- `npm run dev` — start Next.js development server
- `npm run build` — build for production
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint
- `npm run generate` — prisma generate
- `npm run migrate:dev` — prisma migrate dev

Troubleshooting

- If Prisma can't connect, verify `DATABASE_URL` and ensure the Postgres container is running or your DB is reachable.
- If you hit connection limits during development, ensure the Prisma client is shared (see `src/lib/prisma.ts`).

Contributing

Contributions are welcome. Open an issue or submit a pull request with clear descriptions and tests where appropriate. Keep changes small and focused.

License

This project does not include a license file. Add one (for example MIT) if you plan to open-source it.

Acknowledgements

- Built with Next.js, Prisma and PostgreSQL.
