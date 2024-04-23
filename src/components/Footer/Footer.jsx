import React from "react"
import styles from "./Footer.module.css"
import {Logo} from "../Header/components/Logo"

const Footer = () => {
    return (
        <footer className={styles.footer_wrap}>
            <div className={styles.footer_column}>
                <Logo />
                <p className={styles.moto}>Scoup out your skills</p>
                <p className={styles.main_text}>@Copyright</p>
            </div>
        </footer>
    )
}

export {Footer}