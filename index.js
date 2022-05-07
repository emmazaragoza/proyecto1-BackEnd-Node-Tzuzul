const express = require('express')
const router = express()

// Puerto
const { port } = require('./config/index.js')

// funcion que hace la conexion de la BD.
const {connection} = require('./config/db.js');
connection() // Esta conecta con la BD

router.use(express.json())

//* futuras rutas

router.listen(port, () => {
    console.log("server escuchando")
})