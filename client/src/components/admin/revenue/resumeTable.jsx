import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import React, { useEffect, useRef } from "react";
import CurrencyText from "../../currencyText";

export default function ResumeTable({ data }) {
  const tableCont = useRef(null);

  useEffect(() => {
    document.getElementById("table-resume").innerHTML = "";
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
      data: data.map((val, i) => {
        return [
          i + 1,
          val.nama_produk,
          val.jumlah,
          _(<CurrencyText value={val.total} />),
        ];
      }),
    });
    grid.render(tableCont.current);
    grid.forceRender();
  }, [data]);
  return <div id="table-resume" ref={tableCont} />;
}
