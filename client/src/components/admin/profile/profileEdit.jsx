import {
  Avatar,
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../App";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.nama);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(user.foto);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const navigate = useNavigate();
  var imgIsChange = useRef(false);

  function handleImgUpload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var fileUrl = reader.readAsDataURL(file);

    reader.onloadend = function () {
      imgIsChange.current = true;
      setProfileImage(reader.result);
    };
  }

  function validatePassword(e) {
    let passwordConfirm = e.target.value;
    setPasswordConfirm(e.target.value);
    if (passwordConfirm !== password) {
      setPasswordError(true);
      setPasswordHelper("password tidak sesuai");
    } else if (passwordConfirm === password) {
      setPasswordHelper("");
      setPasswordError(false);
    }
  }

  function handleSubmit(e) {
    if (passwordEdit && passwordConfirm !== password) {
      alert("konfirmasi password tidak sesuai");
      return;
    }
    e.preventDefault();
    const formElem = document.getElementById("admin-profile-edit");
    const formData = new FormData(formElem);

    formData.append("passwordEdit", passwordEdit);
    formData.append("imgIsChange", imgIsChange.current);

    setIsLoading(true);
    axios
      .put(`http://localhost:5000/update-user/${user.id_profile}`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success === true) {
          setIsLoading(false);
          setUser(response.data.user);
          navigate("/admin/profile");
        }
      })
      .catch((err) => setIsLoading(false));
  }

  function togglePasswordEdit() {
    setPasswordEdit((prev) => !prev);
    setPassword("");
    setPasswordConfirm("");
  }
  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
        id="admin-profile-edit"
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Avatar
            alt="user-profile"
            src={profileImage}
            sx={{
              maxWidth: 120,
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
            }}
          />
          <label
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            htmlFor="contained-button-file"
          >
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImgUpload}
              name="profile-img-input"
            />

            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              component="span"
            >
              <ModeEditOutlineRoundedIcon />
            </Fab>
          </label>

          <TextField
            id="input-nama"
            label="Nama"
            variant="outlined"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            {passwordEdit ? (
              <Button
                variant="contained"
                startIcon={<CloseRoundedIcon />}
                onClick={togglePasswordEdit}
                color="error"
              >
                Batal edit
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<ModeEditOutlineRoundedIcon />}
                onClick={togglePasswordEdit}
                color="success"
              >
                Edit Password
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="input-username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="input-password"
              label="Password"
              variant="outlined"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!passwordEdit}
              name="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="input-email"
              label="Email"
              variant="outlined"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="input-password-confirm"
              label="Konfirmasi password"
              variant="outlined"
              type={"password"}
              value={passwordConfirm}
              onChange={validatePassword}
              disabled={!passwordEdit}
              error={passwordError}
              helperText={passwordHelper}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <LoadingButton
            loading={isLoading}
            endIcon={<CheckRoundedIcon />}
            variant="contained"
            type="submit"
            color="success"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Paper>
  );
}
