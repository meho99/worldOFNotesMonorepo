# World Of Notes monorepo

## **1. To run and use this project you must:**

- ## add files:

  - `.fauncarc` file in main directory that contains: `FAUNA_KEY=YOUR_FAUNA_KEY`

- ## install:

  - node, npm and docker
  - lerna: `npm i -D lerna`
  - netlify: `npm install netlify-cli -g` // version 6.14.16
  - fauna-shell: `npm install -g fauna-shell`
  - project-dependencies: `npm run install-all`

- ## connect with fauna database
  - in case of connection with cloud fauna db
    - add `.env` file in main directory that contains: JWT_SECRET=YOUR_JWT_SECRET_KEY and FAUNA_KEY=YOUR_FAUNA_KEY
  - in case of using local database
    - look at instruction in step 2

## **2. Local faunadb setup:**

- initialize docker, setup faunadb endpoint, database and key by running `npm run fauna-dev`
- set generated keys to env `export $(grep -v '^#' .env.test | xargs)`
- run migrations and fill initial data: `npm run init-db`

## **3. Commands:**

- `netlify dev` : start app and server locally (it will run on local faundb by default)
- `npm run install-all` : install and link all packages
- If you wish to run project on cloud database set env `DB` to `cloud` before starting: `export DB=cloud`
