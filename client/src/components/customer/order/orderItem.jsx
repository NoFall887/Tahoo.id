import { TableCell, TableRow } from "@mui/material";
import React, { useContext } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import CurrencyText from "../../currencyText";
import { orderEditContext } from "./order";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function OrderItem({ itemData, index }) {
  const { onEdit, setTempData, tempData } = useContext(orderEditContext);
  console.log(tempData);
  var data = tempData.slice(1);
  function updateTotal(data) {
    let temp = 0;
    data.forEach((val) => {
      temp += val.jumlah * val.harga;
    });
    return temp;
  }

  function handleChange(value, index) {
    // console.log(tempData);
    setTempData((prevData) => {
      const data = prevData[index + 1];
      if (parseInt(value) < 0 || value === "") {
        data.jumlah = 0;
      } else {
        data.jumlah = parseInt(value);
      }

      prevData[0] = updateTotal(prevData.slice(1));
      const result = [...prevData];
      return result;
    });
    return;
  }

  return (
    <TableRow key={index} sx={{ "& td": { border: "none" } }}>
      <TableCell>
        <img
          src={itemData.foto}
          alt="product"
          style={{ width: "42px", aspectRatio: "1/1", objectFit: "cover" }}
        ></img>
      </TableCell>
      <TableCell>{itemData.nama_produk}</TableCell>

      {onEdit ? (
        <TableCell>
          <InputGroup size="sm" style={{ width: "fit-content" }}>
            <Button
              variant="outline-secondary"
              id="subtract"
              onClick={() => handleChange(data[index].jumlah - 1, index)}
            >
              <RemoveCircleOutlineRoundedIcon />
            </Button>
            <FormControl
              style={{ textAlign: "center" }}
              type="number"
              value={data[index].jumlah}
              onChange={(e) => handleChange(e.target.value, index)}
              name="jumlah"
            />
            <Button
              variant="outline-secondary"
              id="add"
              onClick={() => handleChange(data[index].jumlah + 1, index)}
            >
              <AddCircleOutlineRoundedIcon />
            </Button>
          </InputGroup>
        </TableCell>
      ) : (
        <TableCell align="right">{itemData.jumlah + " Kg"}</TableCell>
      )}

      <TableCell align="right">
        <CurrencyText value={itemData.harga} />
      </TableCell>

      <TableCell align="right">
        <CurrencyText value={itemData.jumlah * itemData.harga} />
      </TableCell>
    </TableRow>
  );
}
