import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import { UserContext } from "../../../App";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import { Link } from "react-router-dom";

export default function ProfileHead() {
  const { user } = useContext(UserContext);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            alt="user-profile"
            src={user.foto}
            sx={{
              maxWidth: 120,
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
            }}
          />
          <Box>
            <Typography variant="subtitle1" component={"p"} color={grey[500]}>
              Nama
            </Typography>
            <Typography variant="h5" component={"span"}>
              {user.nama}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            py: 1,
          }}
        >
          <Typography variant="subtitle1" component={"p"} color={grey[700]}>
            Username
          </Typography>
          <Typography fontSize={18} fontWeight={500} component={"p"}>
            {user.username}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            py: 1,
          }}
        >
          <Typography variant="subtitle1" component={"p"} color={grey[700]}>
            Email
          </Typography>
          <Typography fontSize={18} fontWeight={500} component={"p"}>
            {user.email}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Link
        to={"/admin/profile/edit"}
        style={{
          textDecoration: "none",
          textAlign: "center",
          margin: "32px 0",
        }}
      >
        <Button startIcon={<ModeEditOutlineRoundedIcon />} variant="contained">
          Edit Profil
        </Button>
      </Link>
    </Paper>
  );
}
