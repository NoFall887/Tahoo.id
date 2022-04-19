const { pool } = require("./pool");

// require username password email as argument
function insertUser(req, res, next){
  const queryText = "INSERT INTO data_profile(username, password, email, is_admin) VALUES($1, $2, $3, false)"
  const {username, password, email} = req.user;
  
  pool.query(queryText, [username, password, email], (err, data)=>{
    if (err){
      req.err = err["code"];
      next()
    }
    req.data = data
    next()
  })
}

async function getUser(username) {
  const queryText = "SELECT * FROM data_profile WHERE username=$1"
  try {
    var res = await pool.query(queryText, [username])
    return res.rows[0]
  } catch (err) {
    console.log(err)
  }
}

module.exports = {insertUser, getUser}