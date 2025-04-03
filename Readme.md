# BookeyTore

A library management system.

## Table of Contents
- [Development](#development)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)

### Installation

1. Set the environment variables. On local copy `.env.local` to `.env`.

```sh
cp .env.local .env
```

2. Install requirements:

- backend

```sh
cd backend
npm install
```

- react

Make sure you are on the root folder.
```sh
npm react-frontend/install
```


- vue

Make sure you are on the root folder.
```sh
npm vue-frontend/install
```

4. Run Server:

```sh
docker compose build
docker compose up
```

4. Run migrations:

```sh
npx prisma
npx prisma migrate --name init
```
