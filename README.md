# Stena-erp

Stena-erp is an enterprice resource planning system.

## Stack list

 - NestJs
 - React
 - Images persistance microservice
 - PostgreSQL
 - Redis
 - TypeORM
 - Typescript
 - Docker
 - Docker-compose
 - Nodemailer?
 - ESLint
 - Prettier
 - VS Code
 - Telegram bot
 - Clean architecture

## Installation

#### Backend
Install the dependencies and devDependencies.

```sh
cd stena-erp/backend
npm i
```
## Development

#### Backend

Run database in docker container.

```sh
sudo chmod +x backend/scripts/start-postgres-db.sh
sudo .backend/scripts/start-postgres-db.sh
```

Run development server

```sh
cd backend
npm run start:dev
```
## Plan

 1. [x] NestJs Backend boilerplate
 2. [x] File structure backend
 3. [x] Vs Code config format on save
 4. [x] Backend core base interfaces and abstract classes
 5. [x] Role entity domain
 6. [x] Logger
 7. [x] Exceptions
 8. [x] Interceptor for logging
 9. [x] Implement Result monad for error handling
 10. [x] Validation lib
 11. [x] Role validation
 12. [x] Api documentation (swagger)
 13. [x] Result monad fix isOk() isErr() to be instance of Ok and Err respectively
 15. [x] Role usecases
 16. [x] Rename exceptions to errors as errors belong to business domain
 17. [x] Postgres docker script for development
 18. [x] TypeORM connection
 19. [x] Role controller, use cases
 20. [x] Big refactoring
 21. [x] Fix roleFactory
 22. [x] User model
 23. [x] User repository
 24. [x] User usecases
 25. [x] User controller and module
 26. [x] Swagger Dto for role controller
 27. [x] Swagger Dto for user controller
 28. [x] Describe start develompent in README
 29. [x] Add db structure diagram to the project
 30. [ ] Product Model
