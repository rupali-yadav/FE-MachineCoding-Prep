
"use client";

import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";


// const getPhotos = async () => {
//     const resp = await fetch(
//         "https://jsonplaceholder.typicode.com/photos",
//         { cache: "force-cache" } //SSG
//     )

//     if (!resp?.ok) throw new Error("Could not fetch the images");

//     return resp.json();
// }

export default function PhotoGallery() {

    // const photosResp = await getPhotos();

    // const photos = photosResp?.slice(0, 10)
    return (
        <>
            <h1>Welcome! </h1>
            <ImageCarousel />
        </>
    )
}