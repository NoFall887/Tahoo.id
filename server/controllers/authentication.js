const { insertUser } = require("../models/userProfile")
const bcrypt = require("bcrypt")
const passport = require("passport")
const authRouter  = require("express").Router()

authRouter.get("/authVerify", (req,res) => {
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

authRouter.post("/register", 
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

authRouter.post("/login", passport.authenticate("local", {failureRedirect:"htpp://localhost:3000/login"}), (req, res) => {
  res.status(200).json({success:true, user: req.user})
})

authRouter.post('/logout', async (req, res)=>{
  // req.session.destroy((err)=> {
  //   if (err) return res.status(500).json(err)
  //   await res.clearCookie('connect.sid')
  //   res.status(200).json({success: true})
  //   return
  // })
  req.logout()
  res.status(200).json({success: true})
})

module.exports = authRouter