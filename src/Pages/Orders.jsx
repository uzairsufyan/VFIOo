import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Box } from "@mui/system";
import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Close, Edit } from "@mui/icons-material";

export default function Orders() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const fetchUsers = () => {
    axios.get("https://wc-server-production.up.railway.app/shop/order/show").then((res) => {
      console.log(res.data.orders);
      setUsers(res.data.orders);
    });
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 73px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Address</TableCell>
                <TableCell>Customer Phone</TableCell>
                <TableCell>Shipping Fee</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Tracking ID</TableCell>
                <TableCell>Tracking Service</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((o, i = 0) => {
                i = i + 1;
                return <Row order={o} key={i} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
const Row = ({ order }) => {
  const [enable, setEnable] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [o, setO] = React.useState(order);
  const [values, setValues] = React.useState({
    _id: o._id,
    status: o.status,
    TrackingService: o.TrackingService ? o.TrackingService : "",
    TrackingId: o.TrackingId ? o.TrackingId : "",
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

  const handleSubmit = () => {
    axios
      .post("https://wc-server-production.up.railway.app/shop/order/update", values)
      .then((res) => {
        console.log(res.data);
        setO(res.data.data);
        handleClose();
      });
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setEnable(enable ? false : true)}>
            {enable ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </TableCell>
        <TableCell>{o.Name}</TableCell>
        <TableCell>{o.Address}</TableCell>
        <TableCell>{o.Phone}</TableCell>
        <TableCell>PKR {o.ShippingFee}</TableCell>
        <TableCell>{o.Payment}</TableCell>
        <TableCell>{o.status}</TableCell>
        <TableCell>{o.TrackingId}</TableCell>
        <TableCell>{o.TrackingService}</TableCell>
        <TableCell>PKR {o.TotalAmount}</TableCell>
        <TableCell>
          <IconButton   onClick={handleClickOpen}>
            <Edit sx={{ fontSize: 15 }} />
          </IconButton>
        </TableCell>
      </TableRow>
      {enable ? (
        <TableRow>
          <TableCell colSpan={11}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr#</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Sub Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {o.products.map((p, i = 0) => {
                  i = i + 1;
                  return (
                    <>
                      <TableRow key={i}>
                        <TableCell>{i}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>PKR {p.price}</TableCell>
                        <TableCell>{p.quantity}</TableCell>
                        <TableCell>PKR {p.price * p.quantity}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
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
              Edit Order
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
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
              label="Tracking ID"
              sx={{ width: "100%", m: 1 }}
              variant="standard"
              value={values.TrackingId}
              onChange={handleChange("TrackingId")}
            />
          </Box>
          <Box sx={{ width: "300px" }}>
            <FormControl variant="standard" sx={{ width: "100%", m: 1 }}>
              <InputLabel id="gender">Courier Service</InputLabel>
              <Select
                label="Courier Service"
                name="gender"
                id="gender"
                // color="info"
                variant="standard"
                value={values.TrackingService}
                onChange={handleChange("TrackingService")}
                // required
              >
                <MenuItem value="TCS">TCS</MenuItem>
                <MenuItem value="Cheeta">Cheeta</MenuItem>
                <MenuItem value="DHL">DHL</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: "300px" }}>
            <FormControl variant="standard" sx={{ width: "100%", m: 1 }}>
              <InputLabel id="gender">Status</InputLabel>
              <Select
                label="Courier Service"
                name="gender"
                id="gender"
                // color="info"
                variant="standard"
                value={values.status}
                onChange={handleChange("status")}
                // required
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Ready To Ship">Ready To Ship</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Ready To Deliver">Ready To Deliver</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Not Received">Not Received</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
