const { pool } = require("./pool");

// require username password email as argument
function insertUser(req, res, next){
  const queryText = "INSERT INTO data_profile(nama, username, password, email, is_admin) VALUES($1,$1, $2, $3, false) RETURNING *;"
  const {username, password, email} = req.user;
  
  pool.query(queryText, [username, password, email], (err, data)=>{
    if (err){
      req.err = err["code"];
      next()
    }
    req.data = data.rows[0]
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

async function updatePassword(id,password) {
  const queryText = 
`UPDATE data_profile 
SET password=$2
WHERE id_profile=$1
RETURNING * ;`
  try {
    var res = await pool.query(queryText, [parseInt(id), password])
    return res.rows[0]
  } catch (err) {
    console.log(err)
  }
}

async function updateUser({
  id,username, nama, email, foto
} = {}) {
  const queryText = 
`UPDATE data_profile 
SET username = $1,
    nama = $2,
    email = $3,
    foto = $4 
WHERE id_profile=$5
RETURNING * ;`
  try {
    var res = await pool.query(queryText, [username, nama, email, foto, parseInt(id)])
    return res.rows[0]
  } catch (err) {
    console.log(err)
  }
}
module.exports = {insertUser, getUser, updateUser, updatePassword}