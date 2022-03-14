require('dotenv').config({ path: '.env' });

module.exports= { 
  "development": {
    "driver": process.env.POSTGRES_DRIVER,
    "host": process.env.POSTGRES_HOST,
    "database": process.env.POSTGRES_DB,
    "user": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "dialect" : 'postgres'
  },
  "test": {
    "driver": process.env.POSTGRES_DRIVER,
    "host": process.env.POSTGRES_HOST,
    "database": process.env.POSTGRES_DB_TEST,
    "user": process.env.POSTGRES_USER_TEST,
    "password": process.env.POSTGRES_PASSWORD,
    "dialect" : 'postgres'
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": 'postgres'
  }
}