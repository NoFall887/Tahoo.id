import { Box, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import AdminLoading from "../../components/admin/adminLoading";
import Admin from "../../components/admin/adminTemplate";
import AddRevenueForm from "../../components/admin/revenue/addRevenueForm";
import AddRevenueSubmit from "../../components/admin/revenue/addRevenueSubmit";

export default function AddRevenue() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([{ produk: "", jumlah: 0 }]);
  const productsTemp = products.map((val) => {
    return { ...val };
  });
  useEffect(() => {
    axios
      .get("/admin/item-data", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          return setProducts([
            { id_produk: "", nama_produk: "None" },
            ...response.data.data.map((item) => {
              item.selected = false;
              return item;
            }),
          ]);
        }
      });
  }, []);

  return (
    <Admin>
      {products.length === 0 ? (
        <AdminLoading />
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <IconButton
              size="large"
              onClick={() => navigate("/admin/pendapatan")}
            >
              <ArrowBackRoundedIcon fontSize="inherit" />
            </IconButton>
            <Typography component={"h2"} variant={"h6"}>
              Tambah data catatan
            </Typography>
          </Box>
          <Paper sx={{ p: 2 }}>
            {formData.map((data, i) => {
              if (
                i > 0 &&
                formData[i - 1].produk !== "" &&
                productsTemp.findIndex(
                  (val) => val.id_produk === formData[i - 1].produk
                )
              ) {
                productsTemp[
                  productsTemp.findIndex(
                    (val) => val.id_produk === formData[i - 1].produk
                  )
                ].selected = true;
              }

              return (
                <AddRevenueForm
                  key={i}
                  index={i}
                  data={data}
                  products={productsTemp}
                  setFormData={setFormData}
                />
              );
            })}
          </Paper>
          <AddRevenueSubmit
            formData={formData.slice(0, formData.length - 1)}
            products={products.slice(1)}
          />
        </>
      )}
    </Admin>
  );
}
