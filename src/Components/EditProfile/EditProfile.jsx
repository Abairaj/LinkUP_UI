import "./editProfile.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js.cookie";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Avatar, InputLabel, NativeSelect } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import axiosInstance from "../../AxiosQueries/axosInstance";

export default function EditProfile() {
  const ApiURL = import.meta.env.VITE_API_URL;
  const User = useSelector((state) => state.user);
  const [profile, setProfile] = useState("");
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  console.log(User, "gfg");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const id = Cookies.get("id");
    axiosInstance.get(`/users/user_profile/${id}`).then((response) => {
      const User = response.data;
      let defaultValues = {};
      defaultValues.bio = User.bio;
      defaultValues.full_name = User.full_name;
      defaultValues.phone = User.phone;
      defaultValues.gender = User.gender;

      reset({ ...defaultValues });
    });
  };

  const uploadImage = (image) => {
    setProfile(image);
    axiosInstance
      .put(
        `/users/user_profile/${Cookies.get("id")}`,
        { profile: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const onFormsubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    const id = Cookies.get("id");

    const response = axiosInstance
      .put(`/users/user_profile/${id}`, data)
      .then((response) => {
        fetchData();
        if (response.status === 200) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onErrorsubmit = (error) => {
    console.log(error);
  };
  return (
    <div className="editprofile">
      <div className="head">
        <h1>Edit User</h1>
      </div>
      <Container className="container" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            padding: "20px",
            paddingTop: "0px",
            paddingBottom: "0px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5"></Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onFormsubmit, onErrorsubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="profileedit__profilebar">
                  <Avatar
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : User.profile
                        ? User.profile
                        : "https://th.bing.com/th/id/OIP.Ii15573m21uyos5SZQTdrAHaHa?pid=ImgDet&rs=1"
                    }
                    className="profile_edit__avatar"
                  >
                    {!User.profile && User.username[0]}
                  </Avatar>

                  <div className="profile__name">
                    <p>{User.username}</p>
                    {/* <p>{User.full_name}</p> */}

                    <div className="uploadinput">
                      <input
                        onChange={(e) => uploadImage(e.target.files[0])}
                        style={{ display: "none" }}
                        type="file"
                        id="imageupload"
                        accept="image/*"
                      />
                    </div>
                    <label htmlFor="imageupload">Upload</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="label">Name</InputLabel>
                <TextField
                  className="field"
                  required
                  fullWidth
                  id="name"
                  name="full_name"
                  size="small"
                  {...register("full_name", {
                    required: "name is required",
                  })}
                  autoComplete="email"
                />
                <p className="error">{errors.full_name?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="label">Bio</InputLabel>
                <TextField
                  className="field"
                  required
                  fullWidth
                  name="bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  size="small"
                  id="bio"
                  {...register("bio", {
                    pattern: {
                      value: /^.{1,150}$/,
                      message: "Bio not more than 150 characters",
                    },
                  })}
                />
                <p className="error text-red">{errors.bio?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="label">Phone</InputLabel>
                <TextField
                  className="field"
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  size="small"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[7-9][0-9]{9}$/,
                      message: "Mobile number invalid",
                    },
                  })}
                  autoComplete="phone"
                />
                <p className="error text-red">{errors.phone?.message}</p>
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  className="label"
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Gender
                </InputLabel>
                <NativeSelect
                  className="selection"
                  inputProps={{
                    name: "gender",
                    id: "uncontrolled-native",
                  }}
                  {...register("gender")}
                >
                  <option className="selection" value={"Male"}>
                    Male
                  </option>
                  <option className="selection" value={"Female"}>
                    Female
                  </option>
                  <option className="selection" value={"Other"}>
                    Other
                  </option>
                </NativeSelect>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  className="label"
                  variant="contained"
                  size="small"
                  sx={{ color: "white" }}
                >
                  Update
                </Button>
              </Grid>{" "}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
