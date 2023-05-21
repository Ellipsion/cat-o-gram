import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCatImages } from "../api/api";


// my api has no pagination so the infinite query failed
// switching to normal query
const Feed = () => {
  // const { data, isLoading, isError } = useQuery(['todos'], getCatImages);
  const [page, setPageNumber] = useState(0);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['cats'],
    queryFn: fetchCatImages,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= 100 ? nextPage : undefined;
    },
  });

  const observer = useRef();

  if (status === 'loading') return <h2>loading...</h2>
  return (<div>
    <h2>Feed</h2>
    <button onClick={() => fetchNextPage()} style={{ position: "fixed", right: 0 }}>fetch more</button>
    {
      data?.pages.map((page, index) => {
        <div key={index}>
          {
            page.map((cat, index) => (
              <div key={index}>
                <img src={cat.url} width={300} alt="" />
              </div>
            ))
          }

        </div>
      })
    }
    {
      isFetching || isFetchingNextPage
        ?
        'loading more...'
        :
        ''
    }

  </div>);
};

export default Feed;
