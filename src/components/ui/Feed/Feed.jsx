import React, { useRef, useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCatImages } from "../../../api/api";
import Gallery from "../../Gallery2";

import styles from "./Feed.module.css"
import Loader from "../Loader/Loader";
import SkeletonCard from "./../Card/SkeletonCard"

const pageLimit = 5;

const Feed = () => {
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
        <div className={styles.feed}>
            {
                process.env.NODE_ENV === 'production'
                    ?
                    ""
                    :
                    <div className={styles.devTools} >
                        <button onClick={fetch} disabled={isFetching}>fetch more</button>
                        <h3>{data?.pages.length || ""}</h3>
                        <h3>{data?.pages.length * 10 || ""}</h3>
                    </div>
            }


            <div>
                {

                    data?.pages.map((page, index) => (
                        <Gallery key={"gallery-" + index} images={page} width={300} />
                    ))
                }


            </div>



            {
                !isFetching && hasNextPage && data
                    ?
                    <div
                        ref={lastCatRef}
                        style={{ position: "absolute", bottom: 100, backgroundColor: "black" }}
                    ></div>
                    :
                    ""
            }


            <div style={{ marginTop: 20 }}>
                {
                    isFetching
                        ?
                        isFetchingNextPage
                            ?
                            <>
                                <Loader />
                            </>
                            :
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <Loader />
                            </>

                        :
                        <h4>
                            You have reached the end of cats
                        </h4>
                }

            </div>


        </div>

    );
}

export default Feed;
