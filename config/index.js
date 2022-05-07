require('dotenv').config(); // carga las variables de entorno a todo el sistema.

const config = {
    port: process.env.PORT,
    dbusername: process.env.DB_USERNAME,
    dbpassword: process.env.DB_PASSWORD,
    dbhost: process.env.DB_HOST,
    dbname: process.env.DB_NAME
};

module.exports = config