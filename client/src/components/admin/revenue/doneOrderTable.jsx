import axios from "axios";
import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import React, { useEffect, useRef } from "react";
import CurrencyText from "../../currencyText";

export default function DoneOrderTable({ date, setResumeData }) {
  const tableCont = useRef(null);
  const isFirst = useRef(true);
  useEffect(() => {
    document.getElementById("table-order").innerHTML = "";

    function getData(opts) {
      return new Promise((resolve, reject) => {
        axios.get(opts.url, { withCredentials: true }).then((response) => {
          if (!response.data.success) return reject();
          const respData = response.data.data;
          console.log(respData);
          if (isFirst.current) {
            setResumeData(respData);
            isFirst.current = false;
          }
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
    }
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
        url: `/admin/done-order/${date}`,
        data: getData,
      },
    });

    grid.render(tableCont.current);
    grid.forceRender();
    isFirst.current = true;
  }, [date]);

  return <div id="table-order" ref={tableCont} />;
}
