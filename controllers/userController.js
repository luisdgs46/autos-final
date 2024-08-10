const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
   
    const { username, email, password } = req.body
    try {
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
       
        const respuestaDB = await Usuario.create({
            username,
            email,
            password: hashedPassword
        })
        
        return res.json(respuestaDB)
    } catch (error) {
        return res.status(400).json({
            msg: error
        })
    }
}

exports.login = async (req, res) => {


    const { email, password } = req.body
    try {

        let foundUser = await Usuario.findOne({ email })

        if (!foundUser) {
            return res.status(400).json({ msg: "Username does not exist" })
        }

        const passCorrecto = await bcryptjs.compare(password, foundUser.password)

        if (!passCorrecto) {
            return await res.status(400).
                json({ msg: "The username or password does not correspond" })
        }

        const payload = { user: { id: foundUser.id } }

        jwt.sign(
            payload,

            process.env.SECRET,
            {
                expiresIn: 3600
            },
            (error, token) => {
                if (error) throw error;

                res.json({ token })
            })
    } catch (error) {
        res.json({
            msg: "we have an error",
            error
        })
    }
}
exports.verifytoken = async (req, res) => {
    try {

        const usuario = await Usuario.findById(req.user.id).select('-password')
        res.json({ usuario })
    } catch (error) {

        res.status(500).json({
            msg: "we have an error",
            error
        })
    }
}