
# User APP

### Overview

The User-app is a robust solution built on top of Next.js - a comprehensive full-stack server solution. It utilizes Prisma as its Object-Relational Mapping (ORM) tool for storing user data and runs on PostgreSQL@14 for database management.

#### Prerequisites
*  Requires Node version (v16.20.1)
*  Requires PostgreSQL version (v14)

### Run app service in local

  #### Run app server by docker compose
  Clone the repository from GitHub and navigate to the root directory of the app.
  You can review the docker-compose.yml file for detailed docker configurations.

  ```
  docker-compose up
  open http://localhost:3000/neptune

  docker-compose stop
  ```

### Development by local
  Clone the repository from GitHub and navigate to the root directory of the app.

  #### Run NEXT.JS server
  ```
  pnpm install
  pnpm run start:local
  open http://localhost:3000/neptune
  ```

###  Application Data Flow

```mermaid
state diagram
    Client(NEXT.JS, Typescript) --> Server(NEXT.JS, Prisma)
    Server(NEXT.JS, Prisma) --> DataBase(PostgreSQL)
    Server(NEXT.JS, Prisma) --> Client(NEXT.JS, Typescript)
```
