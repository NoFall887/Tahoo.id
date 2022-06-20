import { IconButton } from "@mui/material";
import axios from "axios";
import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import React, { useEffect, useRef, useState } from "react";
import CurrencyText from "../../currencyText";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RevenueEdit from "./revenueEdit";
export default function RevenueTable({ date, setResumeData }) {
  const isFirst = useRef(true);
  const dataOnEdit = useRef({});
  const [open, setOpen] = useState(false);

  var grid = new Grid({
    columns: [
      "No",
      "Waktu",
      { name: "Keterangan", sort: false },
      "jumlah",
      {
        name: "Total",
        sort: {
          compare: (a, b) => {
            const getValue = (elem) => elem.props.element.props.value;

            if (getValue(a) > getValue(b)) {
              return 1;
            } else if (getValue(b) > getValue(a)) {
              return -1;
            } else {
              return 0;
            }
          },
        },
      },
      { name: "", id: "action-btn" },
    ],

    sort: true,
    server: {
      url: `/admin/revenue/${date}`,
      data: getData,
    },
  });
  function getData(opts) {
    return new Promise((resolve, reject) => {
      axios.get(opts.url, { withCredentials: true }).then((response) => {
        if (!response.data.success) return reject();
        const respData = response.data.data;
        if (isFirst.current) {
          setResumeData((data) => {
            data[1] = respData;
            return [...data];
          });
          isFirst.current = false;
        }

        resolve({
          data: respData.map((row, index) => {
            return [
              index + 1,
              new Date(row.tanggal).toLocaleTimeString("en-US", {
                hour12: false,
              }),
              row.nama_produk,
              row.jumlah,

              _(<CurrencyText value={row.total} />),
              _(
                <IconButton
                  color="primary"
                  onClick={() => {
                    dataOnEdit.current = row;
                    setOpen((val) => !val);
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              ),
            ];
          }),
        });
      });
    });
  }

  useEffect(() => {
    document.getElementById("table-revenue").innerHTML = "";
    grid.render(document.getElementById("table-revenue"));
    grid.forceRender();
    isFirst.current = true;
  }, [date]);

  return (
    <>
      <div id="table-revenue" />
      <RevenueEdit
        data={dataOnEdit.current}
        open={open}
        setOpen={setOpen}
        renderGrid={() => {
          document.getElementById("table-revenue").innerHTML = "";
          grid.render(document.getElementById("table-revenue"));
          grid.forceRender();
          isFirst.current = true;
        }}
      />
    </>
  );
}
