import { Box, Fab, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Admin from "../../components/admin/adminTemplate";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import RevenueTable from "../../components/admin/revenue/revenueTable";
import CurrencyText from "../../components/currencyText";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

export default function AdminRevenue() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  return (
    <Admin sx={{ "& .gridjs-table": { width: "100%" } }}>
      <Box sx={{ position: "relative", minHeight: "80vh" }}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "row",
            p: 2,
            mb: 2,
          }}
        >
          <DatePicker
            orientation="landscape"
            disableFuture
            value={date}
            onChange={(newDate) =>
              setDate(moment(newDate).format("YYYY-MM-DD"))
            }
            renderInput={(props) => <TextField {...props} />}
            label="Tanggal"
          />
          <Typography
            component={"span"}
            sx={{ color: "#FF7E81" }}
            variant={"h4"}
          >
            <CurrencyText value={total} />
          </Typography>
        </Paper>

        <RevenueTable date={date} setTotal={setTotal} />

        <Fab
          size="large"
          color="secondary"
          aria-label="add"
          component="button"
          sx={{ position: "absolute", right: 0, bottom: 0 }}
          onClick={() => {
            navigate("/admin/pendapatan/tambah");
          }}
        >
          <AddRoundedIcon />
        </Fab>
      </Box>
    </Admin>
  );
}
