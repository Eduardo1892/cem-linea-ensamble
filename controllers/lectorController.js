const { Lector } = require('../config/db')

const listarLectores = async (req,res) => {

    const lectores = await Lector.findAll()

    res.json({
        lectores
    })

}

module.exports = {
    listarLectores
}