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
import { updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ProgressButton } from "./components/ProgressButton";
import { db } from "../../Firebase/firebase";
import countryList from "../SignUp/countries.json";
import { registerOptions } from "../SignUp/validationRules";

const EditProfile = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  const getUserData = async (id) => {
    try {
      const userDocRef = doc(db, "users", id);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("User data:", userData);
        return userData;
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(id);
      if (userData) {
        setFormData(userData);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    for (const field in formData) {
      if (registerOptions[field]) {
        const fieldRules = registerOptions[field];
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
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, formData);
      navigate(`/profile/${id}`);
      console.log("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const userDocRef = doc(db, "users", id);
      await deleteDoc(userDocRef);
      localStorage.removeItem("id");
      localStorage.removeItem("role");

      navigate("/signin");
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
          style={{ display: "flex", width: "80%" }}
          sx={{ px: 10, py: 5 }}
        >
          <Grid container spacing={7}>
            <Grid item xs={4} sx={{ mx: "auto" }}>
              <Avatar
                src={formData.avatar ? formData.avatar : "/broken-image.jpg"}
                sx={{ width: 150, height: 150, mb: 3, mx: "auto" }}
                style={{
                  border: "4px solid rgba(215, 227, 224, 0.5)",
                }}
              ></Avatar>
              <TextField
                name="avatar"
                label="Avatar URL"
                value={formData.avatar}
                onChange={handleChange}
                fullWidth
                inputProps={{ maxLength: 300 }}
                sx={{ mb: 2 }}
              />
              {role === "talent" && (
                <TextField
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  inputProps={{ maxLength: 300 }}
                />
              )}
              <Divider sx={{ my: 4, color: "red" }}>DELETE PROFILE</Divider>
              <ProgressButton
                longPressBackspaceCallback={() => handleDelete()}
              />
            </Grid>
            <Grid item xs={5} sx={{ mx: "auto" }}>
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
                label="Password"
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
