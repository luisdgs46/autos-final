const mongoose = require('mongoose')
const autosSchema = mongoose.Schema({
        nombre: {
            type: String, 
            required: true
            },
        precio: {
            type: Number
        },
    },
    {
        timestamps: true
    }
)
const autos = mongoose.model('Auto', autosSchema)

module.exports = autos