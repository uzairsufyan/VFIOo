import "./App.css";
import React from "react";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItems from "./Components/AddItems/AddItems";
import Logo from "./assets/logo.png";

import { Alert, Box, Collapse, IconButton } from "@mui/material";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login/Login";
import { useState } from "react";
import Products from "./Pages/Products";
import AllProducts from "./Pages/AllProducts";
import Dashboard from "./Pages/Dashboard";

import AddUser from "./Pages/AddUser";

const App = () => {
  const [alert, setAlert] = useState("true");
  const [severity, setSeverity] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  if (openAlert === true) {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }
  const LoginComponent = (
    <Login
      setAlert={setAlert}
      setOpenAlert={setOpenAlert}
      setSeverity={setSeverity}
      setLogin={setLogin}
      setUser={setUser}
      setIsAdmin={setIsAdmin}
    />
  );
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  return (
    <Router>
      <Box
        sx={{
          height: "72px",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid #c2c2c2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            p: "0 30px",
            backgroundColor: "white",
          }}
        >
          <img src={Logo} alt="Pet Hub" style={{ width: "150px" }} />
        </Box>
        {user ? <Box>{user?.role?.toUpper}</Box> : <></>}
      </Box>
      {/* Alert Area */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      {/* ----------------------------------------- */}
      <Collapse in={openAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <i className="fa fa-times"></i>
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      </Collapse>
      {login && (user?.role === "admin" || user?.role === "brand") ? (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ width: "200px" }}>
            <Navigation
              setLogin={setLogin}
              role={user.role}
              setUser={setUser}
            />
          </Box>
          <Box sx={{ width: "calc(100% - 200px)" }}>
            <Routes>
              {/* <Route path="/AddProducts" element={<AddItems />} /> */}
              <Route path="/" element={<Dashboard />} />
              {user?.role === "admin" ? (
                <>
                  <Route path="/Users" element={<Users />} />
                  <Route path="/AddUsers" element={<AddUser />} />
                </>
              ) : (
                <></>
              )}
              <Route path="/Orders" element={<Orders />} />
              <Route path="/Products" element={<Products />}>
                <Route
                  index
                  path="/Products"
                  element={<AllProducts user={user} />}
                />
                <Route
                  path="AddProduct"
                  element={<AddItems Brand={user.name} />}
                />
              </Route>
            </Routes>
          </Box>
        </Box>
      ) : (
        LoginComponent
      )}
    </Router>
  );
};

export default App;
