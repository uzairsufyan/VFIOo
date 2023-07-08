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
// import "./AddItems.css";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";

const AddItems = ({ Brand }) => {
  console.log(Brand);
  const Navigate = useNavigate();
  const [IMGG, setIMGG] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [values, setValues] = useState({
    name: "",
    category: "",
    sub_category: "",
    quantity: "",
    price: "",
    description: "",
    Warranty: "",
    Return: "",
    StandardShipping: "",
    FastShipping: "",
    Image: "",
    color: "",
    size: "",
    brand: Brand,
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
    console.log(values.Image);
    if (!values.Image) {
      alert("Please Add an Image");
      return false;
    } else if (
      !values.name ||
      !values.price ||
      !values.quantity ||
      !values.description ||
      !values.Return ||
      !values.FastShipping ||
      !values.StandardShipping ||
      !values.Warranty
    ) {
      alert("All Fields are required");
      return;
    } else if (values.name.length < 10) {
      alert("Name Must have more then 10 characters");
    } else if (values.price <= 0) {
      alert("Price Must be More then 0");
    } else {
      const storageRef = ref(storage, `files/${values.Image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, values.Image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
      // console.log(imgUrl);
      if (imgUrl === null) return;
      const formData = {
        name: values.name,
        category: values.category,
        sub_category: values.sub_category,
        quantity: values.quantity,
        price: values.price,
        description: values.description,
        Warranty: values.Warranty,
        Return: values.Return,
        StandardShipping: values.StandardShipping,
        FastShipping: values.FastShipping,
        Image: imgUrl,
        color: values.color,
        brand: Brand,
        size: values.size,
      };
      axios
        .post("https://wc-server-production.up.railway.app/shop/add", formData)
        .then((res) => {
          alert(res.data.message);
          setValues({
            name: "",
            category: "",
            sub_category: "",
            quantity: "",
            price: "",
            description: "",
            Warranty: "",
            Return: "",
            StandardShipping: "",
            FastShipping: "",
            Image: "",
          });
          setImgUrl(null);
          Navigate("/Products");
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
          <Box sx={{ m: 1 }}>
            <Box
              sx={{
                width: "200px",
                height: "100px",
                contain: "content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              {" "}
              {IMGG ? (
                <img src={IMGG} alt="" width={200} />
              ) : (
                <Add sx={{ fontSize: 70, color: "GrayText" }} />
              )}
            </Box>
            <input
              type="file"
              name="Image"
              accept=".png, .jpg, .jpeg"
              onChange={handleImage}
            />
          </Box>
        </Box>
        <Box sx={{ width: "700px" }}>
          <TextField
            label="Product Name"
            variant="standard"
            type="text"
            name="name"
            placeholder="Product Name"
            value={values.name}
            onChange={handleChange}
            sx={{ width: "45%", m: 1 }}
            required
          />
          <TextField
            label="Quantity"
            variant="standard"
            type="number"
            name="quantity"
            // placeholder="values Quanity"
            value={values.quantity}
            onChange={handleChange}
            required
            sx={{ width: "45%", m: 1 }}
          />
        </Box>
        <Box sx={{ width: "700px" }}>
          <TextField
            label="Color"
            variant="standard"
            type="text"
            name="color"
            placeholder="Color"
            value={values.color}
            onChange={handleChange}
            sx={{ width: "45%", m: 1 }}
          />
          <TextField
            label="Size"
            variant="standard"
            type="number"
            name="size"
            value={values.size}
            onChange={handleChange}
            sx={{ width: "45%", m: 1 }}
          />
        </Box>
        <Box sx={{ width: "700px" }}>
          <TextField
            label="Brand Name"
            variant="standard"
            type="text"
            name="brand"
            placeholder="Brand Name"
            value={values.brand}
            onChange={handleChange}
            sx={{ width: "45%", m: 1 }}
          />
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender" color="info">
              Main Category *
            </InputLabel>
            <Select
              label="Main Category *"
              name="sub_category"
              id="sub_category"
              color="info"
              variant="standard"
              value={values.sub_category}
              onChange={handleChange}
              required
              // sx={{ width: "45%", m: 1 }}
            >
              <MenuItem value="Select Tag">Select Tag</MenuItem>
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "700px" }}>
          <TextField
            label="Price"
            variant="standard"
            type="number"
            name="price"
            // placeholder="values Price"
            value={values.price}
            onChange={handleChange}
            required
            sx={{ width: "45%", m: 1 }}
          />
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender" color="info">
              Category *
            </InputLabel>
            <Select
              label="Category *"
              name="category"
              id="category"
              color="info"
              variant="standard"
              value={values.category}
              onChange={handleChange}
              required
              // sx={{ width: "45%", m: 1 }}
            >
              <MenuItem value="Select Tag">Select Tag</MenuItem>
              <MenuItem value="Pants">Pants</MenuItem>
              <MenuItem value="Shirts">Shirts</MenuItem>
              <MenuItem value="Dress">Dress</MenuItem>
              <MenuItem value="Winter Wear">Winter Wear</MenuItem>
              <MenuItem value="Accessory">Accessory</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "700px" }}>
          <TextField
            label="Details"
            variant="standard"
            name="description"
            // placeholder="values Details"
            onChange={handleChange}
            value={values.description}
            rows={5}
            required
            sx={{ width: "45%", m: 1 }}
          />
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender">Warranty</InputLabel>
            <Select
              label="Warranty"
              name="Warranty"
              id="Warranty"
              variant="standard"
              value={values.Warranty}
              onChange={handleChange}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "700px" }}>
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender">Return</InputLabel>
            <Select
              label="Return"
              name="Return"
              id="Return"
              variant="standard"
              value={values.Return}
              onChange={handleChange}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender">Fast Shipping</InputLabel>
            <Select
              label="Fast Shipping"
              name="FastShipping"
              id="FastShipping"
              variant="standard"
              value={values.FastShipping}
              onChange={handleChange}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ width: "45%", m: 1 }}>
            <InputLabel id="gender">Standard Shipping</InputLabel>
            <Select
              label="Standard Shipping"
              name="StandardShipping"
              id="StandardShipping"
              variant="standard"
              value={values.StandardShipping}
              onChange={handleChange}
            >
              <MenuItem value="N/A">N/A</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
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

export default AddItems;
