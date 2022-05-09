const { checkAuth } = require("./authentication");
const cloudinary = require("./cloudinaryConf");
const upload = require("./multer");
const profileRouter = require("express").Router();
const streamifier = require("streamifier");
const {
  updateUser,
  updatePassword,
  getUser,
} = require("../models/userProfile");
const bcrypt = require("bcrypt");

async function imgUpload(req, res, next) {
  if (req.body.imgIsChange === "false") {
    return next();
  }

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      streamifier.createReadStream(req.files[0].buffer).pipe(stream);
    });
  };

  req.uploadResult = await streamUpload(req);
  next();
}

profileRouter.put(
  "/update-user/:id",
  checkAuth,
  upload.any(),
  imgUpload,
  async (req, res, next) => {
    const userId = req.params.id;
    var { username, name, email, password, passwordEdit } = req.body;
    const imgUrl =
      req.uploadResult?.secure_url == null
        ? req.body.foto
        : req.uploadResult.secure_url;
    console.log(req.body);

    if (passwordEdit === "true") {
      password = await bcrypt.hash(password, 12);
      await updatePassword(userId, password);
    }
    updateUser({
      username: username,
      nama: name,
      email: email,
      foto: imgUrl,
      id: userId,
    }).then((result) => {
      req.login(result, function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, user: result });
      });
      return result;
    });
  }
);

// profileRouter.get();
module.exports = { profileRouter, imgUpload };
