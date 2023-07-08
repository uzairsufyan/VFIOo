import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { Box } from "@mui/material";
import {
  Add,
  ArrowDownward,
  CheckCircle,
  Dashboard,
  Group,
  Home,
  Inventory,
  KeyboardArrowDown,
  Logout,
  Pets,
} from "@mui/icons-material";

const Navigation = ({ setLogin, role, setUser }) => {
  const NavlinkSx = {
    color: "#2f2f2f",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    backgroundColor: "none",
    padding: "10px 30px",
    cursor: "pointer",
  };
  const [ap, setAp] = React.useState(false);
  const [ass, setAss] = React.useState(false);
  const handleLogout = () => {
    setLogin(false);
    setUser(null);
  };
  return (
    <Box
      sx={{
        p: 1,
        borderRight: "1px solid #c2c2c2",
        height: "calc(100vh - 72px)",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ fontSize: 20 }}>
        <NavLink exact to="/" activeClassName="is-active" style={NavlinkSx}>
          <Dashboard sx={{ mr: 2 }} />
          Dashboard
        </NavLink>
      </Box>
      <Box sx={{ fontSize: 20 }}>
        <Box sx={NavlinkSx} onClick={() => setAp(ap ? false : true)}>
          <Inventory sx={{ mr: 2 }} />
          Products
        </Box>
      </Box>
      {ap ? (
        <Box sx={{ fontSize: 15 }}>
          <NavLink to="/Products" activeClassName="is-active" style={NavlinkSx}>
            <Inventory sx={{ mr: 1, fontSize: 15 }} />
            All Products
          </NavLink>
          <NavLink
            to="/Products/AddProduct"
            activeClassName="is-active"
            style={NavlinkSx}
          >
            <Add sx={{ mr: 1, fontSize: 15 }} />
            Add Product
          </NavLink>
        </Box>
      ) : (
        <></>
      )}
      {role === "admin" ? (
        <>
          <Box sx={{ fontSize: 20 }}>
            <NavLink to="/Users" activeClassName="is-active" style={NavlinkSx}>
              <Group sx={{ mr: 2 }} />
              Users
            </NavLink>
          </Box>
          <Box sx={{ fontSize: 20 }}>
            <NavLink
              to="/AddUsers"
              activeClassName="is-active"
              style={NavlinkSx}
            >
              <Group sx={{ mr: 2 }} />
              Add User
            </NavLink>
          </Box>
        </>
      ) : (
        <></>
      )}
      <Box sx={{ fontSize: 20 }}>
        <NavLink to="/Orders" activeClassName="is-active" style={NavlinkSx}>
          <CheckCircle sx={{ mr: 2 }} />
          Orders
        </NavLink>
      </Box>

      <Box
        sx={{
          fontSize: 20,
          color: "#2f2f2f",
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          backgroundColor: "none",
          padding: "10px 30px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        {/* <NavLink to="/Pets" activeClassName="is-active"> */}
        <Logout sx={{ mr: 2, color: "#0066cc" }} /> Logout
        {/* </NavLink> */}
      </Box>
    </Box>
  );
};

export default Navigation;
