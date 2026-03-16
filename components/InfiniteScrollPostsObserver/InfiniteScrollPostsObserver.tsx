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

    if (!resp.ok) throw new Error("Something went wrong!");

    return resp.json();
}


export default function InfiniteScrollPostsObserver() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);


    const containerRef = useRef<HTMLDivElement | null>(null);
    const postsRef = useRef<(HTMLDivElement | null)[]>([]);
    const pageNum = useRef<number>(1);

    const canLoadMore = useMemo(() => {
        return !error && hasMore && !loading;
    }, [error, hasMore, loading]);

    const loadNext = useCallback(async () => {

        if (!canLoadMore) return;

        setLoading(true);
        try {
            const newPosts = await fetchPosts(pageNum.current);
            setPosts((prev) => [...prev, ...newPosts]);
            setHasMore(newPosts.length === PAGE_SIZE);
            pageNum.current += 1;
        } catch (e) {
            setError("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }, [canLoadMore]);

    useEffect(() => {
        const lastPost = postsRef.current[posts.length - 1];
        // return if lastPost is not present; 
        if (!lastPost) return;

        const options = {
            // always start from root so mention it as null
            root: null,
            rootMargin: "0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {

                loadNext();
                // unobserve the last elem
                observer.unobserve(entries[0].target);
            }
        }, options);

        // observe the last post
        lastPost && observer.observe(lastPost);

        return () => observer.disconnect();
    }, [posts, loadNext])

    useEffect(() => {
        loadNext();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen p-4">
            <div className=" flex flex-col gap-2 p-2">
                {
                    posts?.length ? (
                        posts.map((post, i) => (
                            <div
                                // we will watch for the last card in the list, and when it comes into view, we will load more posts
                                ref={(el) => {
                                    postsRef.current[i] = el;
                                }}
                                key={"" + i + post?.id}
                                className="flex flex-col gap-2 p-2 border-2 rounded-sm"
                            >
                                <div className="text-md">{post?.id}</div>
                                <div className="text-md">{post?.title}</div>
                                <div className="text-sm">{post?.body}</div>
                            </div>
                        ))
                    ) : null
                }
            </div>
            {loading && <h1>Loading......</h1>}
            {error && <h1>{error}</h1>}
        </div >
    );
}

// flow
// 1-  loadNext on load
// 2-  page++; newposts added ; hasMore updated;
// 3-  useEffect for posts triggered 
// 4- observer is set to observe the last post which is out of the view port
// when user scrolls to the post ; load next is triggered again
// 1-4 repeat again