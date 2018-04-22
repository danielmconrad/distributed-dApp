## Requirements
- Docker

## Installation
```bash
git clone git@github.com:danmconrad/distributed-dApp.git
docker-compose build
docker-compose up
```

Configure MetaMask to use the `http://localhost:8545` network.

## Common Commands

### Add a new dependency
`docker-compose run app yarn add DEPENDENCY`
  
### Test dapp:            
`docker-compose run app yarn test`
  
### Run dev server:       
`docker-compose run app yarn start`
  
### Build for production: 
`docker-compose run app yarn build`

### Migrate:              
`docker-compose run app truffle migrate`
  
### Test contracts:       
`docker-compose run app truffle test`