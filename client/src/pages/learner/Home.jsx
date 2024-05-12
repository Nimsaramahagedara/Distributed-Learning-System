import React from 'react'
import Loader from '../../components/Loader/Loader'
import MainCarousel from '../../components/Carousel/MainCarousel'

export default function Home() {
  return (
    <div className='w-full'>
      <div className='flex items-stretch justify-center bg-white p-5 border rounded-xl gap-5'>
        <MainCarousel>
          <div>
            <img src="https://img.freepik.com/free-psd/e-learning-online-courses-banner-template_23-2149109791.jpg" />
          </div>
          <div>
            <img src="https://www.shutterstock.com/image-illustration/business-training-courses-concept-can-260nw-1483009133.jpg" />
          </div>
          <div>
            <img src="https://t3.ftcdn.net/jpg/04/01/36/86/360_F_401368641_nEdHMBlrlmyW09cBtm4lvb83EtN7Gx5t.jpg" />
          </div>
        </MainCarousel>
        <div className='w-full bg-white'>
          <h1 className='text-2xl font-semibold'>Online Learning Portal</h1>
        </div>
      </div>

      <div className='text-xl font-semibold my-5'>
        Recommended Courses
      </div>
    </div>
  )
}
