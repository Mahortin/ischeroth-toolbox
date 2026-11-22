# Ischeroth Toolbox

The app runs Vue, Spring Boot, and MariaDB with Docker Compose.

## Local development

With Docker running and the Compose plugin available in your shell, run this from the repository root:

```bash
bash scripts/startup.sh
```

Open http://localhost:5173. Vite reloads frontend changes and proxies API requests to Spring Boot. After editing backend code, rerun startup to rebuild the backend image. The `ischeroth-dev` Compose project uses the local credentials in `config.dev.env` and initializes a fresh database from `db/init.sql`.

Run `bash scripts/shutdown.sh` to stop the stack and keep the local database volume.

## Webserver deployment

On the server, keep `DATABASE_USER`, `DATABASE_PASSWORD`, and `DATABASE_ROOT_PASSWORD` in the existing ignored `.env` file. The datasource defaults to `jdbc:mariadb://mariadb:3306/ischeroth_infos`. An existing `SPRING_DATASOURCE` or `DIALECT` setting still takes precedence. MariaDB applies initialization credentials and SQL when it creates a new database volume.

From the existing server checkout directory, using the same Compose project name as before, run:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Keeping the existing project name reuses its database volume. The frontend is served on `127.0.0.1:8081` and its Nginx container proxies `/api/` to Spring Boot. The backend also listens on `127.0.0.1:8082` for the existing host reverse proxy.

## Branch workflow

Develop on branches based on `main` and merge completed changes back there. Both Compose configurations live in `main`. To select a tested `main` commit for deployment, fast-forward the local deployment branch:

```bash
git switch deploy-app
git merge --ff-only main
```
