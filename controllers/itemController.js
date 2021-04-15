const { Items } = require('../config/db')

const listarItems = async (req,res) => {

    const items = await Items.findAll()

    res.json({
        items
    })

}

module.exports = {
    listarItems
}