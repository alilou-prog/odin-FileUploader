const path = require('path')
const db = require('../models/queries')

function get_index(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
}

const passport = require('../config/passport');
const { gen_password } = require('../lib/passport_utility');

async function signup_user(req, res) {
    const {hash, salt} = gen_password(req.body.password)
    await db.create_user({
        ...req.body,
        password: hash,
        salt
    });
    res.end()
}

const login_user = [
    passport.authenticate('local'),
    (req, res) => {
        if(req.isAuthenticated()) {
            res.json({is_auth: true, msg: "Authenticated", user: req.user})
        }
        else {
            res.json({is_auth: false, msg: "Authentication failed", user: null})
        }
    }
]

async function test_session(req, res) {
    if(req.session) {
        res.json({status: true, session: req.session})
    }
    else {
        res.json({status: false, err: "session not found"})
    }
}

module.exports = {
    get_index,
    signup_user,
    login_user,
    test_session,
}