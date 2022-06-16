import axios from "axios";
import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import React, { useEffect, useRef } from "react";
import CurrencyText from "../../currencyText";

export default function RevenueTable({ date, setTotal }) {
  const tableCont = useRef(null);

  useEffect(() => {
    document.getElementById("table").innerHTML = "";

    let grid = new Grid({
      columns: [
        "No",
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
      ],
      sort: true,
      server: {
        url: `/admin/get-revenue/${date}`,
        data: (opts) => {
          return new Promise((resolve, reject) => {
            axios.get(opts.url, { withCredentials: true }).then((response) => {
              if (!response.data.success) return reject();
              const respData = response.data.data.data;
              console.log(respData);
              setTotal(response.data.data.total);
              resolve({
                data: respData.map((row, index) => {
                  return [
                    index + 1,
                    row.nama_produk,
                    row.jumlah,
                    _(<CurrencyText value={row.total} />),
                  ];
                }),
              });
            });
          });
        },
      },
    });

    grid.render(tableCont.current);
  }, [date, setTotal]);

  return <div id="table" ref={tableCont} />;
}
