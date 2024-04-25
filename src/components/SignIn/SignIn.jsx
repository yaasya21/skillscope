import React from "react"
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import styles from "./SignIn.module.css"
import {registerOptions} from "../SignUp/validationRules.js"
import {NavLink} from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../Firebase/firebase';

const SignIn= () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()


    const onSubmit = async (data) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", data.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();
                const id = querySnapshot.docs[0].id;
                localStorage.setItem("id", id);
                localStorage.setItem("role", user.role);
                navigate(`/profile/${id}`);
            } else {
                console.log('User not found in Firestore');
            }
        } catch (error) {
            console.error('Error signing in:', error.message);
        }

    }

    return (
        <>
            <form
                className={styles.signin_form}
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.signin_form_elem}>Sign in</h2>
                <div className={styles.signin_form_elem}>
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        {...register("email", registerOptions.email)}
                        className={styles.signin_form_elem}
                    />
                    {errors.username && (
                        <label className={styles.error}>{errors.username.message}</label>
                    )}
                </div>
                <div className={styles.signin_form_elem}>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        {...register("password", registerOptions.password)}
                        className={styles.signin_form_elem}
                    />
                    {errors.password && (
                        <p className={styles.error}>{errors.password.message}</p>
                    )}
                </div>
                <button
                    className={styles.signin_form_elem}
                    type="submit">
                    SIGN IN
                </button>
                <p className={styles.signin_form_elem}>or</p>
                <p>
                    Want to join SkillScope?{" "}
                    <NavLink
                        className={styles.signin_form_elem}
                        to={"/signup"}>
                        <b>Sign up</b>
                    </NavLink>
                </p>
            </form>

        </>
    )
}

export {SignIn}