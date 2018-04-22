### Requirements
- Docker

### Installation
```bash
git clone git@github.com:danmconrad/distributed-dApp.git
docker-compose build
docker-compose up
```

### Common Commands

```bash
  # Migrate:              
  docker-compose run app truffle migrate
  
  # Test contracts:       
  docker-compose run app truffle test
  
  # Test dapp:            
  docker-compose run app npm test
  
  # Run dev server:       
  docker-compose run app npm run start
  
  # Build for production: 
  docker-compose run app npm run build
```