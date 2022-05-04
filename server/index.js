const express = require("express")
const dotenv = require("dotenv")
const app = express()
const session = require("express-session")
const pool = require("./models/pool").pool
const pgSession = require("connect-pg-simple")(session)
const passport = require("passport")
const {authRouter} = require("./controllers/authentication")
const cors = require("cors")
const cloudinary = require('./controllers/cloudinaryConf')
const productRoute = require("./controllers/product")
const {profileRouter} = require("./controllers/profile")
const orderRoute = require("./controllers/order")

dotenv.config()
app.use(express.json())
app.use(cors({credentials:true, origin:'http://localhost:3000',methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))
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

app.use("/auth", authRouter);
app.use('/', productRoute)
app.use('/',profileRouter)
app.use('/', orderRoute)

const listener =  app.listen(process.env.PORT||5000, ()=>{
  console.log("server running on port " + listener.address().port)
})