const { insertUser } = require("../models/userProfile")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router  = require("express").Router()

router.get("/authVerify", (req,res) => {
  // res.json(req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      user:req.user
    })
    return
  } else {
    res.status(200).json({success:false})
  }
  
})

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
  let user = {username: req.user.username, password:req.user.password}
  req.login(user, function(err) {
    if (err) {
      res.status(200).json("registration fail")
      return
    }
    res.status(200).json({success:true, user: req.user})
  })
})

router.post("/login", passport.authenticate("local", {failureRedirect:"htpp://localhost:3000/login"}), (req, res) => {
  res.status(200).json({success:true, user: req.user})
})

module.exports = router