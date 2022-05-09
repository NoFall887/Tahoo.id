import React, { useRef, useState } from "react";
import { Row, Col, Form, Image, Button, Spinner } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";

export default function ProfileEditForm({
  user,
  emptyProfile,
  setEditMode,
  setUser,
}) {
  var imgIsChange = useRef(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.nama);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);

  const [profileImage, setProfileImage] = useState(
    user.foto !== null ? user.foto : emptyProfile
  );
  const [isLoading, setIsLoading] = useState(false);

  function handleImgUpload(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var fileUrl = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      imgIsChange.current = true;
      setProfileImage(reader.result);
    };
  }

  function togglePassEdit(e) {
    const elem = e.target;
    if (passwordEdit) {
      elem.classList.remove("btn-danger");
      elem.classList.add("btn-primary");
      setPasswordEdit(false);
    } else {
      elem.classList.remove("btn-primary");
      elem.classList.add("btn-danger");

      setPasswordEdit(true);
    }
  }

  function cancelEdit() {
    setEditMode(false);
  }

  function handleSubmit(e) {
    if (passwordEdit && passwordConfirm !== password) {
      alert("konfirmasi password tidak sesuai");
      return;
    }
    e.preventDefault();
    const formElem = document.getElementById("userProfileEdit");
    const formData = new FormData(formElem);

    formData.append("passwordEdit", passwordEdit);
    formData.append("imgIsChange", imgIsChange.current);
    formData.append("foto", user.foto);
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
          setEditMode(false);
        }
      })
      .catch((err) => setIsLoading(false));
  }

  return (
    <Form
      encType="multipart/form-data"
      autoComplete="off"
      onSubmit={handleSubmit}
      id="userProfileEdit"
    >
      <Row className="justify-content-around profile-container align-items-center">
        <Col className="user-profile-container shadow col-4 d-flex justify-content-center">
          <div className="user-img-container p-4">
            <label
              htmlFor="profile-img-input"
              className="profile-img-label rounded-pill shadow-sm"
            >
              <input
                type="file"
                onChange={handleImgUpload}
                name="profile-img-input"
                id="profile-img-input"
                className="profile-img-input"
                accept="image/*"
              />
              <EditIcon />
            </label>
            <Image className="mb-4" src={profileImage} fluid="true" />
          </div>
        </Col>
        <Col className="col-6">
          <Form.Group className="mb-3" controlId="nameEdit">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="nama"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="usernameEdit">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="emailEdit">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              className="btn btn-primary rounded-pill d-flex align-items-center"
              id="pass-edit-btn"
              onClick={(e) => togglePassEdit(e)}
            >
              {passwordEdit
                ? [<CloseRoundedIcon key={1} />, " Batal edit"]
                : [<EditIcon key={1} />, " Edit password"]}
            </Button>
          </div>

          <Form.Group className="mb-3" controlId="passwordEdit">
            <Form.Label>Password baru</Form.Label>
            <Form.Control
              disabled={!passwordEdit}
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              required={passwordEdit}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="passwordEditConfirmation">
            <Form.Label>Konfirmasi password</Form.Label>
            <Form.Control
              disabled={!passwordEdit}
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="konfirmasi password"
              required={passwordEdit}
            />
          </Form.Group>
          <div className="d-grid gap-3">
            <Button
              variant="primary"
              className="rounded-pill"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Simpan perubahan"
              )}
            </Button>
            <Button
              variant="danger"
              className="rounded-pill"
              onClick={cancelEdit}
            >
              Batal
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
