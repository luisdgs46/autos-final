
const express = require('express');
const app = express();
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');

const autos = require('./models/autos');
const Usuario = require('./models/Usuario')

const auth = require('./middleware/authorization');
const router = require('./routes/userRouter');
const userRouter = require('./routes/userRouter');


require('dotenv').config()

    /
    connectDB()

app.use(cors())
app.use(express.json());

app.use("/api/user", userRouter);


app.get("/obtener-autos", async (req, res) => {
    try {
        const autos = await autos.find({});
        res.json({ autos })
    } catch (error) {
        res.status(500).json({
            msg: "There was an error obtaining data",
            error

        })
    }
})

app.post("/crear-autos", async (req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevoautos = await Guitarra.create({ nombre, precio })
        res.json(nuevoautos)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error creating the cars",
            error: error.mesage
        })
    }
})

app.put("/actualizar-autos", async (req, res) => {
    const { id, nombre, precio } = req.body
    try {
        const actualizacionautos =
            await autos.findByIdAndupdate(id, { nombre, precio }, { new: true })
        res.json(actualizacionautos)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error updating the cars",
            error
        })
    }
})

app.delete("/borrar-autos", async (req, res) => {
    const { id } = req.body
    try {
        const autosBorrada = await autos.findByIdAnddelete({ _id: id })
        res.json(autosBorrada)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error erasing the specified cars",
            error
        })
    }
})




app.post("/usuario/iniciar-sesion", async (req, res) => {


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
                expiresIn: 3600000
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
})

app.get("/usuario/verificar-usuario", auth, async (req, res) => {
    try {

        const usuario = await Usuario.findById(req.user.id).select('-password')
        res.json({ usuario })
    } catch (error) {

        res.status(500).json({
            msg: "we have an error",
            error
        })
    }
})

app.listen(process.env.PORT, () => console.log("Listening to port"))