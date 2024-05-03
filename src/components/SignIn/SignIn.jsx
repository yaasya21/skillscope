import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.css";
import { registerOptions } from "../../shared/validationRules.js";
import { NavLink } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase.js";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues // Add getValues from useForm
  } = useForm();

  const checkEmailExists = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const checkPasswordCorrect = async (email, password) => {
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const onSubmit = async (data) => {
    try {
      const emailExists = await checkEmailExists(data.email);

      if (emailExists) {
        const passwordCorrect = await checkPasswordCorrect(
          data.email,
          data.password
        );

        if (passwordCorrect) {
          const q = query(collection(db, "users"), where("email", "==", data.email));
          const querySnapshot = await getDocs(q);
          const id = querySnapshot.docs[0].id;
          localStorage.setItem("id", id);
          localStorage.setItem("role", querySnapshot.docs[0].data().role);
          navigate(`/profile/${id}`);
        } else {
          console.log("Incorrect password");
        }
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <>
      <form
        className={styles.signin_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.signin_form_elem}>Sign in</h2>
        <div className={styles.signin_form_elem}>
          <label>Email</label>
          <br />
          <input
            type="text"
            {...register("email", {
              ...registerOptions.email,
              validate: async (value) =>
                (await checkEmailExists(value)) ||
                "Email not found",
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
            {...register("password", {
              ...registerOptions.password,
              validate: async (value) =>
                (await checkPasswordCorrect(getValues("email"), value)) ||
                "Incorrect password",
            })}
            className={styles.signin_form_elem}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
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
