import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";

export default function OrderStatus({ id, statusData }) {
  const [status, setStatus] = useState(statusData);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleSubmit() {
    setIsLoading(true);
    axios
      .post(
        `/admin/update-order-status/${id}`,
        { status: status },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          setIsOpen(true);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      });
  }

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="select-status-label">Status pesanan</InputLabel>

        <Select
          labelId="select-status-label"
          id="select-status"
          value={status}
          label="Status pesanan"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={1}>Selesai</MenuItem>
          <MenuItem value={2}>Menunggu Konfirmasi</MenuItem>
        </Select>
      </FormControl>

      <LoadingButton
        loading={isLoading}
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Simpan Status
      </LoadingButton>

      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data diupdate!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
