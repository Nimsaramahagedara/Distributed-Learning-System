import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import MainCarousel from '../../components/Carousel/MainCarousel'
import authAxios from '../../utils/authAxios'
import { apiUrl } from '../../utils/Constants'
import CourseCard from '../../components/Course/CourseCard'

export default function Home() {

  const [courses, setCourses] = useState([])

  const getAllCourses = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/course`);
      console.log(resp.data);
      setCourses(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCourses()
  }, [])
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
        <h1 className='my-5'>Recommended Courses</h1>

        <div className='w-full overflow-x-scroll'>
          <div className='flex items-center justify-start gap-5 w-max'>
          {
            courses && courses.slice(0,10).map((c)=>(
              <CourseCard course={c}/>
            ))
          }
          </div>

        </div>
      </div>
    </div>
  )
}
