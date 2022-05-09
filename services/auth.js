// importo el modulo de JWT
const jwt = require('jsonwebtoken')
// importo la clave secreta desde la config
const {jwtSecret} = require('../config/index')

// importo de modulo para hashear la contraseña.
const bcryptjs = require('bcryptjs')

// importo el modelo de user
const User = require('../models/user')

class Auth{

    //! Funcion de login.
    async login(data){
        const {email, password} = data // viene desde Auth de rutas

        // se trae al usuario por el emial
        const userServ = new User()
        const user = await userServ.getByEmail(email)
        
        // si tengo usuario y comparo la contraseña
        if(user && await this.#compare(password, user.password)){
            return this.#getUserData(user);
        }

        // si falla todo retorna 
        return {
            error: true,
            message: "Las credenciales son incorrectas"
        }
    }

    //! crear la cuenta.

    async signup(data){
        if(data.password){
            data.password = await this.#encrypt(data.password)
        }
        const userServ = new User()
        const user = await userServ.create(data);
        if(user.error){
            return user
        }
        
        // si todo esta bien, devuelve por medio de la funcion #getUserData, el usuario creado.
        return this.#getUserData(user)
    }



    #getUserData(user){
        const userData = {
            name:user.name,
            email:user.email,
            role:user.role,
            id:user.id
        }

        // crea el token para el usuario
        const token = this.#createToken(userData)
        return {
            user:userData,
            token
        }
    }

    // se crea el token para la funcion token anterior 
    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret, {
            expiresIn: 60
        });
        return token;
    }

    // hashea la contraña del user.
    async #encrypt(string){
        try {
            const salt = await bcryptjs.genSalt()
            const hash = await bcryptjs.hash(string, salt)
            return hash // retorna la contraseña hasheada del user antes de guardala en la DB
        } catch (error) {
           console.log(error) 
        }
    }

    // Compara las contraseñas que esta en la base de datos y la que recibe por "body"
    async #compare(string, hash){
        return await bcryptjs.compare(string, hash)
    }

}

module.exports = Auth