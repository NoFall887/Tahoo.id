const express = require("express")
const dotenv = require("dotenv")
const app = express()
const session = require("express-session")
const pool = require("./models/pool").pool
const pgSession = require("connect-pg-simple")(session)
const passport = require("passport")
const authControl = require("./controllers/authentication")
const { Passport } = require("passport")

dotenv.config()
app.use(express.json())

const sessionStore = new pgSession({pool:pool})

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized:true,
  cookie: {
    maxAge: (24*60*60*1000)
  },
  store: sessionStore
}))

app.use(passport.initialize())
app.use(passport.session())

require("./controllers/passportJS")

app.use("/", authControl);

const listener =  app.listen(process.env.PORT||5000, ()=>{
  console.log("server running on port " + listener.address().port)
})