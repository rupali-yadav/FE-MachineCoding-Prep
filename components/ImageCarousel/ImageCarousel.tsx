"use client";

import { data } from "./data";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const visibleCount = 3;
export const ImageCarousel = () => {


    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextImage = useCallback(() => {
        // If last image is already in the view don't go beyond it 
        // we were able to calculate it because we kept a constant count of visible images which is 3
        setCurrentIndex(currentIndex < data?.length - visibleCount ? currentIndex + 1 : currentIndex)
    }, [currentIndex, data]);

    const goToPreviousImage = useCallback(() => {
        // If I am at image 0 then dont go previous to it
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)
    }, [currentIndex]);

    const visibleImages = useMemo(() => {
        return data.slice(currentIndex, currentIndex + visibleCount)
    }, [currentIndex]);

    return (
        <>
            <h1>Photo Gallery</h1>

            <div>

                {data?.length ? (
                    <div className=" relative flex items-center justify-start gap-10 mt-4 mb-4 border-2 p-4 overflow-hidden">
                        <FaChevronLeft
                            className=" absolute left-0 top-[50%]  z-10"
                            onClick={goToPreviousImage}
                        />
                        {visibleImages?.map((image: any) => (
                            <Image
                                className="mr-2"
                                key={image?.id}
                                src={image?.src}
                                alt="Image"
                                width={200}
                                height={200}
                            />
                        ))}
                        <FaChevronRight
                            className=" absolute right-0 top-[50%]  z-10"
                            onClick={goToNextImage}
                        />
                    </div>
                ) : (<h1>No images found</h1>)}
            </div>
        </>
    )
}