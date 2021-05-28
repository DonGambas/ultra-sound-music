# Ultra Sound Music

## Client

```
cd client

npm i

npm run start

```

## Contracts

code located in `/contracts`

```
cd contracts

npm i

// compiles test ERC20 contract

npx hardhat compile

// deploys ERC20 contract to local running network

npx hardhat run scrips/sample-deploy.js

// runs local network and exposes JSON-RPC server at http://127.0.0.1:8545/

npx harhat node

```

## Server

Requires aws cli and sam cli to be installed

```
cd lambdas

npm i

sam local start-api --port 3001
```
