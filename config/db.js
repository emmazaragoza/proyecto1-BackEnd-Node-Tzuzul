const mongoose = require("mongoose")
const {dbusername, dbpassword, dbhost, dbname} = require('.') 


// conexion a la base de datos.

const connection = async () => {
    const conn = await mongoose.connect(`mongodb+srv://${dbusername}:${dbpassword}@${dbhost}/${dbname}?retryWrites=true&w=majority`)
    console.log("Mongo conectado a la base de datos")
}

module.exports = {connection, mongoose};