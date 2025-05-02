'use client'
import {inspirationImages } from "../data/images";
import Masonry from 'react-masonry-css'

const breakPoint = {
    default : 4,
    1100 : 3,
    700 : 2,
    500 : 1,
}

const InspirationPage = () => {
    return ( 
        <div className="px-4 py-10">
            < Masonry breakpointCols={breakPoint}
            className="flex gap-4"
            columnClassName="space-y-4 bg-clip-padding"
            >
                  {inspirationImages.map((url, index) => (
                <img src={url} alt={`inspiration ${index}`} key={index}
                className="w-full h-auto shadow-md object-cover rounded-lg"
                />
            ))}
            </Masonry>
        </div>
 
     );
}
 
export default InspirationPage;