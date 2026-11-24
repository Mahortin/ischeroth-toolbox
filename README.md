# Ischeroth Toolbox

The app runs Vue, Spring Boot, and MariaDB with Docker Compose. See [Compose file reference](COMPOSE.md) for the files to edit for each environment.

## Local development

With Docker running and the Compose plugin available in your shell, run this from the repository root:

```bash
bash scripts/startup.sh
```

Open http://localhost:5173. Vite reloads frontend changes and proxies API requests to Spring Boot. After editing backend code, rerun startup to rebuild the backend image. The `ischeroth-dev` Compose project uses the local credentials in `config.dev.env` and initializes a fresh database from `db/init.sql`.

Run `bash scripts/shutdown.sh` to stop the stack and keep the local database volume.

### Windows and WSL 2

Start Docker Desktop on Windows in Linux container mode. Under **Settings → General**, enable **Use the WSL 2 based engine** if the setting is visible. Under **Settings → Resources → WSL Integration**, enable the distro that contains this checkout and select **Apply**.

In VS Code, open a new terminal in the WSL distro and run `docker compose version` and `docker info`. Once both succeed, run the startup script there. If the VS Code window is attached to a Dev Container, open a WSL terminal on the host side to start the stack.

[Docker Desktop WSL 2 setup](https://docs.docker.com/desktop/features/wsl/#enable-docker-in-a-wsl-2-distribution)

## Webserver deployment

On the server, keep `DATABASE_USER`, `DATABASE_PASSWORD`, and `DATABASE_ROOT_PASSWORD` in the existing ignored `.env` file. The datasource defaults to `jdbc:mariadb://mariadb:3306/ischeroth_infos`. An existing `SPRING_DATASOURCE` or `DIALECT` setting still takes precedence. MariaDB applies initialization credentials and SQL when it creates a new database volume.

The webserver deploys from `main`. When you are ready to release, run this from the existing server checkout:

```bash
git switch main &&
git pull --ff-only origin main &&
docker compose -p ischeroth-toolbox \
  -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

If your server uses a different Compose project name, substitute it for `ischeroth-toolbox` to reuse the existing database volume. The frontend is served on `127.0.0.1:8081` and its Nginx container proxies `/api/` to Spring Boot. The backend also listens on `127.0.0.1:8082` for the existing host reverse proxy.

## Branch workflow

Create short-lived branches from `main` for changes. Review and test them before merging back into `main`. Deploy from `main` when you are ready to update the webserver.
