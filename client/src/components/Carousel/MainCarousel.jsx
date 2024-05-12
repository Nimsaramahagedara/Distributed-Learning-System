import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MainCarousel = ({children}) => {
    return (
        <Carousel
        className='w-full'
        infiniteLoop
        autoPlay
        showThumbs={false}
        >
          {children} 
        </Carousel>
    )
}

export default MainCarousel