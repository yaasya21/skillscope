import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, Avatar, Grid, Divider } from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Padding } from "@mui/icons-material";

const getUserData = async (id) => {
  try {
    // Reference the document using its path ('users/id')
    const userDocRef = doc(db, "users", id);

    // Retrieve the document snapshot
    const userDocSnap = await getDoc(userDocRef);

    // Check if the document exists
    if (userDocSnap.exists()) {
      // Extract the data from the document snapshot
      const userData = userDocSnap.data();
      console.log("User data:", userData);
      return userData; // Return the user data
    } else {
      console.log("No such user!");
      return null; // Return null if the document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null; // Return null in case of error
  }
};

const EditProfile = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const [formData, setFormData] = useState(null);

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
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, formData);
      navigate(`/profile/${id}`);
      console.log("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
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
          sx={{ px: 10, py: 5}}
        >
          <Grid container spacing={7}>
            <Grid item xs={4}
            sx={{ mx: "auto" }}>
              <Avatar
                src={formData.image ? formData.image : "/broken-image.jpg"}
                sx={{ width: 150, height: 150, mb: 3, mx: "auto" }}
                style={{
                  border: "4px solid rgba(215, 227, 224, 0.5)",
                }}
              ></Avatar>
                <TextField
                  name="image"
                  label="Avatar URL"
                  value={formData.image}
                  onChange={handleChange}
                  fullWidth
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
                inputProps={{ maxLength: 500 }}
              />
            )}
            <Divider sx={{ my: 4, color: "red" }}>DELETE PROFILE</Divider>
            </Grid>
            <Grid item xs={5}
             sx={{ mx: "auto" }}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="surname"
                label="Surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="birthDate"
                label="Birth Date"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" size="large">
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
