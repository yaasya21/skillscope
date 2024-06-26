import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
  Grid,
  Divider,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ProgressButton } from "./components/ProgressButton";
import countryList from "../SignUp/countries.json";
import { registerOptions } from "../../shared/validationRules";
import { getUserById } from "../../db/service/getUserById";
import { updateUser } from "../../db/service/updateUser";
import { deleteUser } from "../../db/service/deleteUser";
import { hashPassword } from "../../shared/hashPassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idUser = location.pathname.split("/profile/")[1].split("/")[0];
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [originalPassword, setOriginalPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserById(id);
      if (userData) {
        setFormData(userData);
        setOriginalPassword(userData.password);
        userData.password = "";
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!id) {
      navigate("/signin");
    }
    if (id !== idUser) {
      navigate(`/profile/${id}/edit`);
    }
  }, [id, idUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    for (const field in formData) {
      if (registerOptions[field]) {
        const fieldRules = registerOptions[field];
        if (field === "password" && formData.password === "") {
          continue;
        }
        for (const rule in fieldRules) {
          if (rule === "required" && !formData[field]) {
            formErrors[field] = fieldRules[rule];
          } else if (
            rule === "pattern" &&
            !fieldRules[rule].value.test(formData[field])
          ) {
            formErrors[field] = fieldRules[rule].message;
          } else if (
            rule === "minLength" &&
            formData[field].length < fieldRules[rule].value
          ) {
            formErrors[field] = fieldRules[rule].message;
          } else if (
            rule === "maxLength" &&
            formData[field].length > fieldRules[rule].value
          ) {
            formErrors[field] = fieldRules[rule].message;
          } else if (
            rule === "validate" &&
            typeof fieldRules[rule].message === "function"
          ) {
            const validationResult = fieldRules[rule].message(formData[field]);
            if (validationResult) {
              formErrors[field] = validationResult;
            }
          }
        }
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (formData.password !== "") {
        formData.password = await hashPassword(formData.password);
      } else {
        formData.password = originalPassword;
      }
      await updateUser(id, formData);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      navigate("/talents");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="750px"
      sx={{ p: 10, py: 5 }}
    >
      {formData && (
        <Paper
          elevation={3}
          style={{ display: "flex" }}
          sx={{ px: 10, py: 5 }}
          minWidth="300px"
        >
          <Grid container spacing={7}>
            <Grid item xs={4} sx={{ mx: "auto" }} minWidth="300px">
              <Avatar
                src={formData.avatar ? formData.avatar : "/broken-image.jpg"}
                sx={{ width: 150, height: 150, mb: 3, mx: "auto" }}
                style={{
                  border: "4px solid rgba(215, 227, 224, 0.5)",
                }}
              ></Avatar>
              {role === "talent" && (
                <>
                  <TextField
                    name="avatar"
                    label="Avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ maxLength: 300 }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    inputProps={{ maxLength: 300 }}
                  />
                </>
              )}
              <Divider sx={{ my: 4, color: "red" }}>DELETE PROFILE</Divider>
              <ProgressButton
                longPressBackspaceCallback={() => handleDelete()}
              />
            </Grid>
            <Grid item xs={5} sx={{ mx: "auto" }} minWidth="300px">
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                name="surname"
                label="Surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.surname}
                helperText={errors.surname}
              />
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                name="password"
                label="New Password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                select
                sx={{ mb: 2 }}
                error={!!errors.location}
                helperText={errors.location}
              >
                {countryList.map((option) => (
                  <MenuItem key={option.cca2} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="birthDate"
                label="Birth Date"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mr: 2 }}
                component={Link}
                to={`/profile/${id}`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export { EditProfile };
