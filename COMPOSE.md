# Compose file reference

Both environments use the same base. The first `-f` loads `docker-compose.yml` and the second merges the chosen environment's settings into it. For example, the base defines how to build the frontend and the production override adds its host port. The base by itself publishes no host ports. Use `up` to apply the merged configuration. `ps -a` lists existing containers and their current ports.

| File | What to edit there |
| --- | --- |
| [docker-compose.yml](docker-compose.yml) | Shared Vue, Spring Boot, and MariaDB services, database volume, and database initialization mount. |
| [docker-compose.dev.yml](docker-compose.dev.yml) | Vite dev server, source mounts for hot reload, and local port `5173`. |
| [docker-compose.prod.yml](docker-compose.prod.yml) | Production bindings on `127.0.0.1`, frontend port `8081`, backend port `8082`, and the frontend restart policy. |
| [config.dev.env](config.dev.env) and server `.env` | Development and production database settings, respectively. The server `.env` is ignored by Git. |
| [Dockerfile.dev](vue-frontend/Dockerfile.dev) and [frontend Dockerfile](vue-frontend/Dockerfile) | Vite development image and the production Vue build served by Nginx, respectively. |
| [Backend Dockerfile](spring-backend/Dockerfile) | How Maven builds the Spring Boot JAR and how the backend container runs it. |
| [nginx.conf](vue-frontend/nginx.conf) | How the frontend container serves Vue and proxies `/api/` to Spring Boot. Host Nginx handles `makofu.de` and HTTPS. |
| [init.sql](db/init.sql) | Initial MariaDB schema and data, applied when MariaDB initializes an empty data volume. |
| [startup.sh](scripts/startup.sh) and [shutdown.sh](scripts/shutdown.sh) | Start and stop the local `ischeroth-dev` Compose project, which has its own database volume. |

See the [README](README.md) for the local startup and webserver deployment commands.
