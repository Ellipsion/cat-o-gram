import React from 'react';
import { LazyLoadImage, trackWindowScroll }
    from 'react-lazy-load-image-component';
import Card from './ui/Card/Card';
// image width, height

const Gallery = ({ images, scrollPosition, width }) => (
    <div>
        {images.map((image, index) => {
            const height = image.height / image.width * width
            const key = image.id + "--" + index + "--" + image.width + "x" + image.height
            return <Card key={key} image={image} width={width} height={height} scrollPosition={scrollPosition} />
        }

        )}
    </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);