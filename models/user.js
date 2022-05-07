const {mongoose} = require("../config/db")

const Schema = mongoose.Schema
const model = mongoose.model


const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        enum:["postulante","empleador","admin"]
    }
})

//const UserModel = model("User",userSchema)

module.exports = model("User", userSchema)