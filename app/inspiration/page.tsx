'use client'
import {inspirationImages } from "../data/images";
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";

const breakPoint = {
    default : 3,
    1100 : 3,
    700 : 2,
}

const batchSize = 4


const InspirationPage = () => {
    const [visible, setVisible] = useState(inspirationImages.slice(0, batchSize))

    const getRandomImages = () => {
      const shuffled = [...inspirationImages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, batchSize);
    };
    
    const fetchMore = () => {
      const nextStart = visible.length;
      const nextEnd = nextStart + batchSize;
    
      let nextBatch = inspirationImages.slice(nextStart, nextEnd);
    
      if (nextBatch.length === 0) {
        nextBatch = getRandomImages();
      }
    
      setVisible((prev) => [...prev, ...nextBatch]);
    };
    

    return ( 
        <div className="px-4 py-10 min-h-screen relative">
            <InfiniteScroll 
            dataLength={visible.length}
            next={fetchMore}
            hasMore={true}
            loader={<p className="text-center text-gray-800 my-4"> Loading ..</p>}
            scrollThreshold={0.9}
            >
            < Masonry breakpointCols={breakPoint}
            className="flex -ml-4 w-auto"
            columnClassName="space-y-4 pl-4"
            >
                  {visible.map((url, index) => (
                    <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md transition-opacity duration-500" key={index}>
                <Image src={url} alt={`inspiration ${index}`} fill
                sizes="(max-width : 768px) 100vw, (max-width : 1200px) 50vw, 25vw"
                className=" object-cover rounded-lg"
                placeholder="empty"
                />
                </div>
            ))}
            </Masonry>

            </InfiniteScroll>

            <Button asChild   
            className="bg-black text-white fixed bottom-4 left-1/2 -translate-x-1/2 shadow-3xl rounded-3xl cursor-pointer px-6 py-2 z-50 text-sm sm:text-base"
            >
              <Link href='/'>
              Back Home
              </Link>
            </Button>
        </div>

 
     );
}
 
export default InspirationPage;