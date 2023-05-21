import React from 'react';
import { LazyLoadImage, trackWindowScroll }
    from 'react-lazy-load-image-component';

// image width, height

const Gallery = ({ images, scrollPosition, width }) => (
    <div>
        {images.map((image, index) => {
            const height = image.height / image.width * width
            return (
                // make this div a card || new component
                <div>
                    <LazyLoadImage
                        key={image.id + "--" + index + "--" + image.width + "x" + image.height}
                        alt={""}
                        src={image.url}
                        width={width}
                        height={height}
                        // Make sure to pass down the scrollPosition,
                        // this will be used by the component to know
                        // whether it must track the scroll position or not
                        scrollPosition={scrollPosition}
                    // threshold={150}
                    />
                </div>);
        }

        )}
    </div>
);
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
export default trackWindowScroll(Gallery);