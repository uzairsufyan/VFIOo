import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Button,
  Dialog,
  FormControl,
  // IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import axios from "axios";
import React from "react";

const AllProducts = ({ user }) => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch();
    return () => {};
  }, []);

  const fetch = () => {
    // const data = { userId: user._id };
    user.role === "admin"
      ? axios
          .get("https://wc-server-production.up.railway.app/shop/show/all")
          .then((res) => {
            // console.log(res.data.products);
            setProducts(res.data.products);
          })
          .catch((err) => {
            console.log(err);
          })
      : axios
          .get(`https://wc-server-production.up.railway.app/shop/show/brand/${user.name}`)
          .then((res) => {
            console.log(res);
            setProducts(res.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 73px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">SR#</TableCell>
              <TableCell variant="head">Name</TableCell>
              <TableCell variant="head">Category</TableCell>
              <TableCell variant="head">Price</TableCell>
              <TableCell variant="head">Quantity Available</TableCell>
              <TableCell variant="head">Quantity Ordered</TableCell>
              <TableCell variant="head" align="center">
                Brand
              </TableCell>
              <TableCell variant="head" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((e, i = 0) => {
              i = i + 1;
              return (
                <Row
                  product={e}
                  key={e._id}
                  no={i}
                  setProducts={setProducts}
                  user={user}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
const Row = ({ product, no, setProducts, user }) => {
  const [enable, setEnable] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [p, setP] = React.useState(product);
  const [values, setValues] = React.useState({
    _id: p._id,
    quantity: p.quantity,
    // TrackingService: o.TrackingService ? o.TrackingService : "",
    // TrackingId: o.TrackingId ? o.TrackingId : "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure to delete this product permanently") == true
    ) {
      axios
        .delete(
          `https://wc-server-production.up.railway.app/shop/delete${product._id}`
        )
        .then((res) => {
          user.role === "admin"
            ? axios
                .get(
                  "https://wc-server-production.up.railway.app/shop/show/all"
                )
                .then((res) => {
                  // console.log(res.data.products);
                  setProducts(res.data.products);
                })
                .catch((err) => {
                  console.log(err);
                })
            : axios
                .get(`https://wc-server-production.up.railway.app/shop/show/brand/${user.name}`)
                .then((res) => {
                  console.log(res);
                  setProducts(res.data.products);
                })
                .catch((err) => {
                  console.log(err);
                });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  const handleEdit = () => {
    const data = { _id: product._id, quantity: values.quantity };
    axios
      .put(
        `https://wc-server-production.up.railway.app/shop/edit${product._id}`,
        data
      )
      .then((res) => {
        user.role === "admin"
          ? axios
              .get("https://wc-server-production.up.railway.app/shop/show/all")
              .then((res) => {
                // console.log(res.data.products);
                setProducts(res.data.products);
              })
              .catch((err) => {
                console.log(err);
              })
          : axios
              .get(`https://wc-server-production.up.railway.app/shop/show/brand/${user.name}`)
              .then((res) => {
                console.log(res);
                setProducts(res.data.products);
              })
              .catch((err) => {
                console.log(err);
              });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TableRow>
        <TableCell>{no}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell align="center">{product.price}</TableCell>
        <TableCell align="center">{product.quantity}</TableCell>
        <TableCell align="center">{product.NumberSold}</TableCell>
        <TableCell align="center">{product.brand}</TableCell>
        {/* <TableCell variant="head">Total Raiting</TableCell> */}
        <TableCell align="center">
          <IconButton onClick={handleClickOpen}>
            <Edit sx={{ fontSize: 15 }} />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        //  TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            color: "#0066cc",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleEdit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "300px" }}>
            <TextField
              label="Product Quantity"
              sx={{ width: "100%", m: 1 }}
              variant="standard"
              value={values.quantity}
              onChange={handleChange("quantity")}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
export default AllProducts;
