const express = require("express")
const dotenv = require("dotenv")
const app = express()

app.use(express.json())
dotenv.config()

const listener =  app.listen(process.env.PORT||3000, ()=>{
  console.log(listener.address().port)
})