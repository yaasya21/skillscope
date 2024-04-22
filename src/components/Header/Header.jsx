import React from "react"
import {Logo} from "./components/Logo"
import styles from "./Header.module.css"
import {NavLink} from "react-router-dom"
//import {useLocation} from "react-router-dom"
//import {ArrowButton} from "./components/ArrowButton"
const Header = () => {
    //let location = useLocation()
    // const isSignup =
    //     location.pathname === "/talents/signup" || location.pathname === "/talents/signin"
    // const isTalentsPage = location.pathname === "/talents"
    // const isProofsPage = location.pathname === "/proofs"
    return (
        <header className={styles.header}>
      <div className={styles.logo_wrap}>
      <Logo />
      </div>
      <div className={styles.button_wrap}>
        <button className={styles.button_in}>SIGN UP</button>
        <button className={styles.button_in}>LOG IN</button>
      </div>
    </header>
    )
}
export {Header}