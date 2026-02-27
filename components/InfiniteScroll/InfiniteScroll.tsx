"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const PAGE_SIZE = 10;

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10

const fetchPosts = async (pageNum: number) => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=${PAGE_SIZE}`);

    if (!resp.ok) throw new Error("Error retrieving posts");

    return resp.json();
}


export default function InfiniteScrollPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const pageRef = useRef<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const canLoadMore = useMemo(() => {
        return hasMore && !loading && !error;
    }, [hasMore, loading, error]);

    const loadNext = useCallback(async () => {
        if (!canLoadMore) return;

        setLoading(true);

        try {
            const newPosts = await fetchPosts(pageRef.current);
            setPosts(prev => [...prev, ...newPosts]);

            // if posts 10  we are going to assume there are more on the next page; 
            // if posts are less than 10 in the newPosts then we know total posts have come to an end
            // and then we would not make any api call even if we reached the sentinel div
            setHasMore(newPosts?.length === PAGE_SIZE);
            pageRef.current += 1;

        } catch (e) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [canLoadMore]);


    // on Load
    useEffect(() => {
        loadNext();
        // adding loadNext as a dependency to avoid stale closure bugs
    }, [loadNext]);

    // option 1
    useEffect(() => {

        const sentinelElem = sentinelRef.current;
        // if we haven't reached sentinel div return
        if (!sentinelElem) return;

        // else set up the observer

        const observer = new IntersectionObserver(async (entries) => {

            // is the sentinel element currently visible inside the viewport?
            if (entries[0]?.isIntersecting) loadNext();
        }, {
            root: null, // we can provide any dom node here; eg: XYZRef.current
            rootMargin: "0px",
            // Trigger the observer 250px before the sentinel actually reaches the screen. 
            // This will help to prefetch for better UX
            threshold: 0
            //This controls how much of the element must be visible before triggering. 
            // we kept zero because it will trigger when even 1 px is visible
        });

        observer.observe(sentinelElem);

        return (() => { observer.disconnect() });
    }, [loadNext]);


    // option2
    // useEffect(() => {
    //     const onScroll = () => {
    //         if ((window.innerHeight + window.scrollY) >= window.document.body.offsetHeight - 30) {
    //             loadNext();
    //         }
    //     }

    //     window.addEventListener("scroll", onScroll)

    //     return () => window.removeEventListener("scroll", onScroll);

    // }, []);

    return (
        <>
            <div className="min-h-screen p-4">

                <div className=" flex flex-col gap-2 p-2">
                    {
                        posts?.length ? (
                            posts.map((post, i) => (
                                <div key={"" + i + post?.id} className="flex flex-col gap-2 p-2 border-2 rounded-sm">
                                    <div className="text-md">{post?.id}</div>

                                    <div className="text-md">{post?.title}</div>
                                    <div className="text-sm">{post?.body}</div>
                                </div>
                            ))
                        ) : null
                    }
                </div>

                {loading && <h1>Loading</h1>}

                {/* our guard/watcher */}
            </div>
            <div>
                <div ref={sentinelRef} className="h-4 bg-amber-400"></div>

            </div>
        </>

    );
}

// we are using a sentinel div and intersection observer so that we dont attach expensive scroll listeners
// We are guarding against duplicate calls using loading and hasMore flags.
// we can detect end of list when API returns fewer items than the page size