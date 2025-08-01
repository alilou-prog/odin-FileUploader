const path = require('path')
const db = require('../models/queries')

function get_index(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
}

async function signup_user(req, res) {
    await db.create_user(req.body);
    res.end()
}

module.exports = {
    get_index,
    signup_user
}