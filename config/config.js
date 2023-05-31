const dotenv = require("dotenv");

if(process.env.NODE_ENV === 'dev'){
    console.log('dev env');
    dotenv.config({ path: `./env/development.env` });
} else if(process.env.NODE_ENV === 'staging'){
    console.log('staging env');
    dotenv.config({ path: `./env/staging.env` })
} else if(process.env.NODE_ENV === 'prod'){
    console.log('prod env');
    dotenv.config({ path: `./env/production.env` })
}

module.exports = {
    "development":{
        "username":process.env.USER,
        "password":process.env.PASSWORD,
        "database":process.env.DATABASE,
        "host":process.env.HOST,
        "dialect":"mysql"
    },
    "staging": {
        "username": process.env.USER,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.USER,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql"
    }
}