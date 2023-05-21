import React, { useCallback, useRef, useState } from 'react';
import { colors } from "../utils/sampleColors"
const Scroll = () => {
    const [data, setData] = useState([...colors, ...colors]);
    const observer = useRef();
    const lastElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setData([...data, ...colors]);
            }
        });

        if (node) observer.current.observe(node);
    });
    return (
        <div>
            <h1>Feed</h1>
            <div style={{ position: "fixed", right: 5 }}>
                <h3>{data.length / 7}</h3>
            </div>
            {
                data.map((row, index) => (
                    <div key={index} ref={
                        data.length === index + 1 ? lastElementRef : null
                    }>
                        <h3>{row.color}</h3>
                    </div>
                ))
            }
        </div>
    );
}

export default Scroll;
