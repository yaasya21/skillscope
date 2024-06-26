import React from "react";
import { useNavigate } from "react-router-dom";
import countryList from "./countries.json";
import { useForm } from "react-hook-form";
import { hashPassword } from "../../shared/hashPassword";
import { registerOptions } from "../../shared/validationRules";
import styles from "./SignUp.module.css";
import { NavLink } from "react-router-dom";
import { addUser } from "../../db/service/addUser";
import { checkEmailExists } from "../../db/service/checkEmailExists";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const role = data.role ? "sponsor" : "talent";
    try {
      const hashedPassword = await hashPassword(data.password);
      const userId = await addUser({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hashedPassword,
        location: data.location,
        birthDate: data.birthDate,
        role: role,
        avatar: null,
        coins: 0,
      });
      console.log("Data added to Firestore successfully!");
      localStorage.setItem("role", role);
      localStorage.setItem("id", userId);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
    }
  };
  return (
    <div className={styles.signup}>
      <h1>Monetize your Skills</h1>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_wrap}>
            <label htmlFor="name">Name</label>
            <input type="text" {...register("name", registerOptions.name)} />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              {...register("surname", registerOptions.surname)}
            />
            {errors.surname && (
              <p className={styles.error}>{errors.surname.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                ...registerOptions.email,
                validate: async (value) =>
                  !(await checkEmailExists(value)) || "Email already taken",
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", registerOptions.password)}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="location">Location</label>
            <select {...register("location", registerOptions.location)}>
              <option value="">---- Select a country ----</option>
              {countryList.map((element) => (
                <option key={element.cca2} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className={styles.error}>{errors.location.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="birthDate">Date of Birth</label>
            <input
              type="date"
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
              {...register("birthDate", registerOptions.birthDate)}
            />
            {errors.birthDate && (
              <p className={styles.error}>{errors.birthDate.message}</p>
            )}
          </div>
          <div className={styles.input_wrap}>
            <label htmlFor="role">Sponsor:</label>
            <input
              className={styles.checkbox}
              type="checkbox"
              {...register("role", {})}
            />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
        <p className={styles.or}>or</p>
        <p className={styles.signin_check}>
          <NavLink className={styles.signin_form_elem} to={"/signin"}>
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export { SignUp };
