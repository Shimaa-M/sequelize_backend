# Store Front Backend

### General info
this project for crud operations of store website that can make orders and request products and should login to can purchase 

### Technologies
sequelize ORM/ typescript/ nodejs/express/postgres/jasmine

### Setup
download the folder to your local machine
```
$ npm init
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




