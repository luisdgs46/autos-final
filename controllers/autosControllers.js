const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const autos = require("../models/autos");

exports.createAutos = async (req, res) => {
    try {
        const autos = await autos.find({});
        res.json({ autos })
    } catch (error) {
        res.status(500).json({
            msg: "There was an error obtaining data",
            error

        })
    }
}


exports.loding = async (req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevoautos = await Autos.create({ nombre, precio })
        res.json(nuevoautos)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error creating the cars",
            error: error.mesage
        })
    }
}

exports.delete = async (req, res) => {
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
}
