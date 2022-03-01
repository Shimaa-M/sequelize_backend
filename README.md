# Store Front Backend

### General info
this project for crud operations of store website that can make orders and request products and should login to can purchase 

### Technologies
sequelize ORM/ typescript/ nodejs/express/postgres/jasmine

### Setup
download the folder to your local machine
```
$ npm install
$ npm run start
```
### database setup
```
- $psql -h localhost -U postgres
- $CREATE USER store_user WITH PASSWORD 'password123';
- $CREATE DATABASE store_dev;
- $\c store_dev
- $GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user;
```
### ports
the backend port is 3000 & database port is 5432


### Test
npm run test

### Environment variables
```
POSTGRES_HOST= localhost
POSTGRES_DB= store_dev
POSTGRES_DB_TEST= store_test
POSTGRES_USER= postgres
POSTGRES_USER_TEST= postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
POSTGRES_DRIVER= pg
POSTGRES_DIALECT=postgres
NODE_ENV=development
BCRYPT_PASSWORD=i-love-my-children
SALT_ROUNDS=10
JWT_TOKEN=i-love-programming
JWT_COOKIE_EXPIRES_IN=90
```


