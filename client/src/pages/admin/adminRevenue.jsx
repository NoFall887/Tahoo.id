import { Box, Fab, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Admin from "../../components/admin/adminTemplate";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import CurrencyText from "../../components/currencyText";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import DoneOrderTable from "../../components/admin/revenue/doneOrderTable";
import RevenueTable from "../../components/admin/revenue/revenueTable";
import ResumeTable from "../../components/admin/revenue/resumeTable";

export default function AdminRevenue() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const total = useRef(0);
  const [resumeData, setResumeData] = useState([[], []]);
  const navigate = useNavigate();
  const [preparedData, setPreparedData] = useState([]);
  useEffect(() => {
    setResumeData([[], []]);
    total.current = 0;
  }, [date]);

  useEffect(() => {
    function prepareData() {
      setPreparedData((prep) => {
        prep = [];
        total.current = 0;
        resumeData.forEach((dataSource) => {
          dataSource.forEach((dataItem) => {
            let dataIndex = prep.findIndex(
              (val) => val.nama_produk === dataItem.nama_produk
            );

            if (dataIndex === -1) {
              prep.push({ ...dataItem });
            } else {
              prep[dataIndex].jumlah += dataItem.jumlah;
              prep[dataIndex].total += dataItem.total;
            }

            total.current += dataItem.total;
          });
        });
        return prep;
      });
    }
    prepareData();
  }, [resumeData]);

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
            onChange={(newDate) => {
              setResumeData([]);
              setDate(moment(newDate).format("YYYY-MM-DD"));
            }}
            renderInput={(props) => <TextField {...props} />}
            label="Tanggal"
          />
          <Typography
            component={"span"}
            sx={{ color: "#FF7E81" }}
            variant={"h4"}
          >
            <CurrencyText value={total.current} />
          </Typography>
        </Paper>
        <Typography component={"h6"} variant="body1">
          Data Pesanan
        </Typography>
        <DoneOrderTable date={date} setResumeData={setResumeData} />
        <Typography component={"h6"} variant="body1">
          Data Catatan
        </Typography>
        <RevenueTable date={date} setResumeData={setResumeData} />
        <Typography component={"h6"} variant="body1">
          Total
        </Typography>
        <ResumeTable data={preparedData} />
        <Fab
          size="large"
          color="secondary"
          aria-label="add"
          component="button"
          sx={{ position: "fixed", right: 18, bottom: 18 }}
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
