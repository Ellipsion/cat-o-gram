import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCatImages } from "../api/api";
import Image from "./Image";
import Gallery from "./Gallery2";


const Feed = () => {
    const [cats, setCats] = useState([]);
    const { data, isLoading, isError, refetch, isInitialLoading, isFetching, isFetched, status, fetchStatus } = useQuery(['todos'], fetchCatImages);

    // useEffect(() => {
    //     if (!isFetching && !isLoading) {
    //         if (cats.length > 50) {
    //             setCats([...data]);
    //         } else {
    //             setCats([...cats, ...data]);
    //         }
    //     }
    // }, [isFetching, data]);

    const addCats = () => {
        if (cats.length + 10 % 2 !== 0) {
            refetch();
        }
    }

    const observer = useRef(null);
    // const lastCatRef = useCallback((node) => {
    //     if (!node) return;
    //     if (isFetching && fetchStatus !== "idle") return;
    //     // console.log("hit!");
    //     console.log(observer.current)
    //     if (observer.current) observer.current.disconnect();
    //     observer.current = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting) {
    //             console.log("hit!");
    //             addCats();
    //         }
    //     });
    //     observer.current.observe(node);
    // }, [isFetching])


    if (isInitialLoading) return <h2>loading...</h2>
    return (
        <div>
            <div style={{ position: "fixed", right: 0 }}>
                <h2 >{
                    isFetching ? "fetching..." : "Feed"
                }</h2>
                <p>{status}</p>
                <p>{fetchStatus}</p>
                <h3>{cats.length}</h3>
                <button style={{ position: "fixed", right: 0 }}>fetch more</button>
            </div>
            <div>
                {
                    <Gallery images={data} width={300} />
                }
            </div>
            <div style={{ height: 50, backgroundColor: "#fcfcfc" }}>
                {
                    isFetching
                        ?
                        'loading more...'
                        :
                        ''
                }
            </div>

        </div>);
};

export default Feed;
