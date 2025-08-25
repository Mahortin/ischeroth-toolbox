# 📦 Fullstack Starter: Angular + Spring Boot + MariaDB

A example project with following tech-stack:
- 🌐 Vue (Frontend)
- 🧪 Spring Boot (Backend)
- 🗄️ MariaDB (Datenbank)


## 🚀 Architektur
### vue-frontend
Vue.js application for GUI
???

### Java Spring Boot Backend
to handle data access
run in spring-backend
```bash
# go to directory
cd spring-backend
./mvnw spring-boot:run
```

### MariaDB in Docker
to persists data
run in project
```bash
# start container
docker compose up
```


### tmp db stuff

mariadb --user=shopuser --password=shoppass shop
mariadb -u shopuser -pshoppass

mariadb -u shopuser -pshoppass -e 'show databases'
mariadb -u shopuser -pshoppass -e 'select * from product' shop
