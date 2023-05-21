import React from 'react';
import styles from "./Loader.module.css"

const Loader = () => {
    return (
        <div className={styles.loadingDots}>
            <div className={styles.loadingDotsDot}></div>
            <div className={styles.loadingDotsDot}></div>
            <div className={styles.loadingDotsDot}></div>
        </div>
    );
}

export default Loader;
