import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styles from "./Payment.module.css";
import { Box, Paper, Button } from "@mui/material";
import { getUserById } from "../../db/service/getUserById";
import { updateCoins } from "../../db/service/updateCoins";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "./utils";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idUser = location.pathname.split("/profile/")[1].split("/")[0];
  const userId = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
    coins: 0,
  });

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    }
    if (userId !== idUser) {
      navigate(`/profile/${userId}/coins`);
    }
  }, [userId, idUser, navigate]);

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "number") {
      e.target.value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      e.target.value = formatExpirationDate(value);
    } else if (name === "cvc" || name === "coins") {
      e.target.value = formatCVC(value);
    } else if (name === "name") {
      e.target.value = formatName(value);
    }
  };

  const handleInputFocus = (e) => {
    setFormData({ ...formData, focused: e.target.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.number ||
      !formData.expiry ||
      !formData.cvc ||
      !formData.coins
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const role = localStorage.getItem("role");
    const amountOfCoins = parseInt(formData.coins || 0);

    try {
      const userData = await getUserById(userId);
      if (userData) {
        const userCoins = userData.coins;
        let updatedCoins = userCoins;

        if (role === "sponsor") {
          if (amountOfCoins === 0) {
            alert("Insufficient coins!");
            return;
          }
          updatedCoins += amountOfCoins;
          alert("Coins added successfully!");
        } else {
          if (userCoins >= amountOfCoins && amountOfCoins !== 0) {
            updatedCoins -= amountOfCoins;
            alert("Coins deducted successfully!");
          } else if (amountOfCoins === 0) {
            alert("Insufficient coins!");
            return;
          } else {
            alert("Not enough coins!");
            return;
          }
        }

        await updateCoins(userId, updatedCoins);
        navigate(`/profile/${userId}`);
      } else {
        console.log("User not found in the database");
      }
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="800px"
    >
      <Paper elevation={3} style={{ width: "50%" }} sx={{ px: 10, py: 5 }}>
        <div key="Payment">
          <div className={styles.wrapper}>
            <h1>Enter your payment details</h1>

            <Cards
              number={formData.number}
              name={formData.name}
              expiry={formData.expiry}
              cvc={formData.cvc}
              focused={formData.focused}
            />

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className={styles.input}>
                <span>Name on card:</span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  pattern="[a-z A-Z]+"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className={styles.input}>
                <span>Card Number:</span>
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  maxLength="19"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className={styles.input}>
                <span>Expiration Date:</span>
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  maxLength="5"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className={styles.input}>
                <span>CVC:</span>
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3}"
                  maxLength="3"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className={styles.input}>
                <span>Amount of coins:</span>
                <input
                  type="tel"
                  name="coins"
                  className="form-control"
                  placeholder="Amount of coins"
                  pattern="\d{3}"
                  maxLength="3"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="medium"
                onClick={handleSubmit}
                style={{
                  marginRight: "5px",
                }}
              >
                confirm
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                size="medium"
                component={Link}
                to={`/profile/${userId}`}
              >
                cancel
              </Button>
            </form>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export { Payment };
