import React, { useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { fetchCatImages } from "../api/api";
import Gallery from "./Gallery2";


const pageLimit = 10;

const Feed = ({ scrollPosition }) => {
    const observer = useRef();
    const {
        data,
        fetchNextPage,
        isFetching,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['cats'],
        queryFn: fetchCatImages,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length + 1;
            return nextPage <= pageLimit ? nextPage : undefined;
        },
    });

    const lastCatRef = useCallback((node) => {
        if (!node) return;
        if (isFetching) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchMore();
            }
        });

        if (node) observer.current.observe(node);
    }, [isFetching]);

    const fetchMore = () => {
        console.log(data);
        console.log(hasNextPage);

        fetchNextPage();
    }
    return (
        <div>
            <div style={{ position: "fixed", right: 0, textAlign: "right" }}>
                <button onClick={fetch} disabled={isFetching}>fetch more</button>
                <h3>{data?.pages.length || ""}</h3>
                <h3>{data?.pages.length * 10 || ""}</h3>
            </div>
            <div style={{ position: "relative" }}>
                {
                    data?.pages.map((page, index) => (
                        <Gallery key={"gallery-" + index} images={page} width={300} />
                    ))
                }
                {
                    !isFetching && hasNextPage
                        ?
                        <div
                            ref={lastCatRef}
                            style={{ position: "absolute", bottom: 100, width: "100vw", backgroundColor: "black" }}
                        >ref</div>
                        :
                        ""
                }

            </div>



            <div style={{ padding: 20, backgroundColor: "#fcfcfc" }}>
                {
                    isFetching || isFetchingNextPage && hasNextPage
                        ?
                        "loading..."
                        :
                        "You have reached the end of cats"
                }

            </div>


        </div>

    );
}

export default trackWindowScroll(Feed);
