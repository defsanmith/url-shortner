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

- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `public`
- **Username:** `root`
- **Password:** `qwedsa`

### 6. Stop the Services

To stop both the PostgreSQL service and the Next.js application, run:

```bash
docker-compose down
```

This will stop and remove the PostgreSQL container, but the database data will persist in the `./data` directory.

### 7. Clean Up

If you want to remove the database data completely, delete the `./data` directory:

```bash
rm -rf ./data
```

### 8. Additional Notes

- You can modify the environment variables (e.g., `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`) in the `docker-compose.yml` file to customize the database setup.
- To reset the database, you can stop the service, remove the `./data` directory, and start the service again.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
