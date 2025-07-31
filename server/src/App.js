require("dotenv").config()
const path = require("path")
const cors = require("cors")
const express = require('express')
const main_router = require("./routes/main_router")
const pg = require("pg")
const app = express()

// session & auth
const express_session = require("express-session")
const passport = require("./config/passport")
const pgSession = require('connect-pg-simple')(express_session)

// View config
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// top-level Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const assets_path = path.join(__dirname, "public")
app.use(express.static(assets_path, {index: '_'}))
app.use(cors())

// auth
const pg_pool = new pg.Pool({
    connectionString: process.env.DB_URL
})

// Session config
app.use(express_session({
    store: new pgSession({
        pool: pg_pool,
        tableName: 'session',
    }),
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
}))
app.use(passport.session())

app.use('/', main_router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running. Listening on port ${PORT}`)
})