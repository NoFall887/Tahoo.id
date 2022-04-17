const express = require("express")
const dotenv = require("dotenv")
const app = express()
const session = require("express-session")
// const cors = require("cors")
dotenv.config()
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized:false
}))

app.get("/", (req, res) => {
  console.log(req.session)
  res.send("my app")
})

const listener =  app.listen(process.env.PORT||3000, ()=>{
  console.log("server running on port " + listener.address().port)
})