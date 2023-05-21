import React from 'react';
import styles from "./Card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
// import placeholderImg from "./../../../assets/cute-cat-no-bg-smol.png"

const cardWidth = 300;
const height = 200;
const Card = () => {

    return (
        <div className={styles.Card}
            style={{ width: cardWidth, height: height, }}
        >

        </div>
    );
}

export default Card;
