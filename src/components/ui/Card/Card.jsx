import React from 'react';
import styles from "./Card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
// import placeholderImg from "./../../../assets/cute-cat-no-bg-smol.png"

const cardWidth = 300;
const Card = ({ key, image, width, height, scrollPosition }) => {

    return (
        <div className={styles.Card}
            style={{ width: cardWidth, height: height, }}
        >
            <LazyLoadImage
                className={styles.image}
                key={key}
                alt={""}
                src={image.url}
                width={width}
                height={height}
                effect="blur"
                // Make sure to pass down the scrollPosition,
                // this will be used by the component to know
                // whether it must track the scroll position or not
                scrollPosition={scrollPosition}
            // threshold={150}
            />

        </div>
    );
}

export default Card;
