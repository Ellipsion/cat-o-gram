import React, { useState, useEffect } from 'react';
import placeholderSrc from '../assets/cute-cat-no-bg-smol.png'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
const placeholderWidth = 94;



const ProgressiveImg = ({ cat, width, scrollPosition }) => {
    const { height: imgHeight, width: imgWidth, url: src } = cat
    const ratio = imgHeight / imgWidth;
    const height = ratio * width;

    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    const customClass =
        placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

    const imageStyle = {
        filter: "blur(0px)",
        transition: "filter 0.5s linear"
    }
    return (
        <LazyLoadImage key={src} placeholderSrc={placeholderSrc} scrollPosition={scrollPosition} threshold={100} src={src} effect='blur' width={300} height={200} alt="" />
    );
    return (
        <>
            {
                placeholderSrc && imgSrc === placeholderSrc
                    ?
                    <div style={{ width, height, border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
                        <img src={placeholderSrc} width={placeholderWidth} height={86} alt="" />
                    </div>
                    :
                    <LazyLoadImage scrollPosition={scrollPosition} threshold={100} src={imgSrc} effect='blur' width={width} height={height} alt="" />

            }
        </>

    );
}

export default ProgressiveImg;
