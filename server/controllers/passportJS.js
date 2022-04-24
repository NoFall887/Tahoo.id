const passport = require("passport");
const { getUser } = require("../models/userProfile");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const userData = await getUser(username);
    if(!userData) {return done(null,false,{"message": "username not found"})}
    var retrievedPass = userData["password"];
    bcrypt.compare(password, retrievedPass, (err, isMatch) => {
      if(err) {
        return done(null, false, {"message" : "incorrect password"})
      }

      if(isMatch) {
        return done(null, userData)
      }
    })
  }
))

passport.serializeUser((user, done) => {
  // console.log(user)
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // console.log(user)
  done(null, user)
})

module.exports = passport