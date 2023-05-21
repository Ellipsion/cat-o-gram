import React from 'react';
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header>
            <p className={styles.title}>Catogram</p>
        </header>
    );
}

export default Header;
