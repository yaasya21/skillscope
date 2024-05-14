import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.css";
import { registerOptions } from "../../shared/validationRules.js";
import { NavLink } from "react-router-dom";
import { verifyPassword } from "../../shared/verifyPassword.js";
import { checkEmailExists } from "../../db/service/checkEmailExists.js";
import { getUserByEmail } from "../../db/service/getUserByEmail.js";
import { getUserId } from "../../db/service/getUserId.js";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const emailExists = await checkEmailExists(data.email);

      if (emailExists) {
        const userData = await getUserByEmail(data.email);

        if (userData) {
          const { password, role } = userData;
          const passwordCorrect = await verifyUserPassword(
            data.password,
            password
          );

          if (passwordCorrect) {
            const id = await getUserId(data.email);
            localStorage.setItem("id", id);
            localStorage.setItem("role", role);
            navigate(`/profile/${id}`);
          } else {
            setErrorMessage("Incorrect password");
          }
        } else {
          setErrorMessage("User not found");
        }
      } else {
        setErrorMessage("User not found");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setErrorMessage("Error signing in");
    }
  };

  const verifyUserPassword = async (enteredPassword, hashedPassword) => {
    try {
      return await verifyPassword(enteredPassword, hashedPassword);
    } catch (error) {
      console.error("Error verifying password:", error.message);
      throw new Error("Error verifying password");
    }
  };

  return (
    <>
      <form className={styles.signin_form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.signin_form_elem}>Sign in</h2>
        <div className={styles.signin_form_elem}>
          <label>Email</label>
          <br />
          <input
            type="text"
            {...register("email", {
              ...registerOptions.email,
              validate: async (value) =>
                (await checkEmailExists(value)) || "Email not found",
            })}
            className={styles.signin_form_elem}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.signin_form_elem}>
          <label>Password</label>
          <br />
          <input
            type="password"
            {...register("password")}
            className={styles.signin_form_elem}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
        <button className={styles.signin_form_elem} type="submit">
          SIGN IN
        </button>
        <p className={styles.signin_form_elem}>or</p>
        <p>
          <NavLink className={styles.signin_form_elem} to={"/signup"}>
            <b>Sign up</b>
          </NavLink>
        </p>
      </form>
    </>
  );
};

export { SignIn };
