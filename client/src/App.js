import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import React from "react";
import Login from "./pages/login";
import "gridjs/dist/theme/mermaid.css";
import Home from "./pages/home";
import axios from "axios";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import Register from "./pages/register";
import AdminHome from "./pages/admin/adminHome";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdminProfile from "./pages/admin/adminProfile";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/admin/theme";
import AdminProfileEdit from "./pages/admin/adminProfileEdit";
import AdminProduk from "./pages/admin/adminProduk";
import AdminProductDetail from "./components/admin/produk/adminProductDetail";
import AdminProductEdit from "./components/admin/produk/adminProductEdit";
import AddProduct from "./components/admin/produk/addProduct";

import AdminOrders from "./pages/admin/adminOrders";
import AdminOrderEdit from "./pages/admin/adminOrderEdit";
import AdminRevenue from "./pages/admin/adminRevenue";
import AddRevenue from "./components/admin/revenue/addRevenue";

axios.defaults.baseURL = "http://localhost:5000";
export const UserContext = createContext({});
export const SidebarContext = createContext({});
function App() {
  // user state
  const [user, setUser] = useState(null);
  // selected menu state
  const [selectedList, setSelectedList] = useState(0);
  // open admin menu state
  const [open, setOpen] = useState(true);
  function adminProtectedElement(component) {
    if (user) {
      if (user.is_admin) {
        return component;
      } else {
        return <Navigate to={"/"} replace={true} />;
      }
    } else {
      return <Navigate to={"/login"} replace={true} />;
    }
  }

  useEffect(() => {
    function verify() {
      axios
        .get("/auth/authVerify", { withCredentials: true })
        .then((response) => {
          if (response.data.success === true) {
            return setUser(response.data.user);
          } else {
            return setUser(false);
          }
        })
        .catch((err) => setUser(false));
    }
    verify();
  }, []);

  if (user === null) {
    return <div></div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <UserContext.Provider value={{ user, setUser, open, setOpen }}>
        <SidebarContext.Provider value={{ selectedList, setSelectedList }}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      user.is_admin ? (
                        <Navigate to={"/admin"} replace={true} />
                      ) : (
                        <Home user={user} setUser={setUser} />
                      )
                    ) : (
                      <Navigate to={"/login"} replace={true} />
                    )
                  }
                />

                <Route
                  path="/login"
                  element={
                    user ? (
                      user.is_admin ? (
                        <Navigate to={"/admin"} replace={true} />
                      ) : (
                        <Navigate to={"/"} replace={true} />
                      )
                    ) : (
                      <Login setUser={setUser} />
                    )
                  }
                />
                <Route
                  path="/register"
                  element={
                    user ? (
                      user.is_admin ? (
                        <Navigate to={"/admin"} replace={true} />
                      ) : (
                        <Navigate to={"/"} replace={true} />
                      )
                    ) : (
                      <Register setUser={setUser} />
                    )
                  }
                />

                <Route
                  path="/admin/"
                  element={adminProtectedElement(<AdminHome />)}
                />
                <Route
                  path="/admin/produk"
                  element={adminProtectedElement(<AdminProduk />)}
                />
                <Route
                  path="/admin/tambah-produk"
                  element={adminProtectedElement(<AddProduct />)}
                />
                <Route
                  path="/admin/produk/:id"
                  element={adminProtectedElement(<AdminProductDetail />)}
                />
                <Route
                  path="/admin/produk/:id/edit"
                  element={adminProtectedElement(<AdminProductEdit />)}
                />
                <Route
                  path="/admin/profile"
                  element={adminProtectedElement(<AdminProfile />)}
                />
                <Route
                  path="/admin/profile/edit"
                  element={adminProtectedElement(<AdminProfileEdit />)}
                />
                <Route
                  path="/admin/pesanan"
                  element={adminProtectedElement(<AdminOrders />)}
                />
                <Route
                  path="/admin/pesanan/:id"
                  element={adminProtectedElement(<AdminOrderEdit />)}
                />
                <Route
                  path="/admin/pendapatan"
                  element={adminProtectedElement(<AdminRevenue />)}
                />
                <Route
                  path="admin/pendapatan/tambah"
                  element={adminProtectedElement(<AddRevenue />)}
                />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </SidebarContext.Provider>
      </UserContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
