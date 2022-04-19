const { insertUser } = require("../models/userProfile")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router  = require("express").Router()

router.post("/register", 
async (req, res, next) => {
  let password = await bcrypt.hash(req.body.password, 12)
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: password
  }
  req.user = user
  next()
}, 
insertUser, 
(req, res) => {
  if(req.err) {
    res.json(req.err)
  }
  res.json(req.user)
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router