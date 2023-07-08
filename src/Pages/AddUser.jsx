import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// ======================================================
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+92(000)0000-000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const AddUser = () => {
  const Navigate = useNavigate();
  const [IMGG, setIMGG] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [values, setValues] = useState({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    registration: "",
    Image: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // ====================================================
  const handleImage = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setIMGG(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.role) {
      alert("All Fields are required");
      return;
    } else if (values.name.length < 2) {
      alert("Name Must have more then 2 characters");
    } else {
      const formData = {
        name: values.name,
        email: values.email,
        role: values.role,
      };
      axios
        .post("https://wc-server-production.up.railway.app/auth/add", formData)
        .then((res) => {
          alert(res.data.message);
          setValues({
            name: "",
            email: "",
            role: "",
          });
          setImgUrl(null);
          Navigate("/Dashboard");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "700px" }}>
          <TextField
            label="User Name"
            variant="standard"
            type="text"
            name="name"
            placeholder="User Name"
            value={values.name}
            onChange={handleChange}
            sx={{ width: "45%", m: 1 }}
            required
          />
          <TextField
            label="Email"
            variant="standard"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
            sx={{ width: "45%", m: 1 }}
          />
        </Box>

        <Box sx={{ width: "700px" }}>
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="role" color="info">
              Role *
            </InputLabel>
            <Select
              label="Role *"
              name="role"
              id="role"
              color="info"
              variant="standard"
              value={values.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="brand">Brand</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "700px" }}>
          <Button
            color="info"
            variant="contained"
            sx={{ width: "45%", m: 1 }}
            onClick={handleSubmit}
          >
            Add values
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUser;
