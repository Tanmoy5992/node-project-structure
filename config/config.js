module.exports = {
    "development":{
        "username":process.env.USER,
        "password":"root",
        "database":"database_development",
        "host":"localhost",
        "dialect":"mysql"
    },
    "staging": {
        "username": "root",
        "password": "root",
        "database": "database_staging",
        "host": "localhost",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": "root",
        "database": "database_production",
        "host": "localhost",
        "dialect": "mysql"
    }
}