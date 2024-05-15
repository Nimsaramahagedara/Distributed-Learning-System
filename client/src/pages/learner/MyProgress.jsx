import axios from 'axios';
import React, { useEffect, useState } from 'react'
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import CourseCard from '../../components/Course/CourseCard';

const MyProgress = () => {
  const [myCourses, setMyCourses] = useState()
  const getMyCourses = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/learn/all`)
      setMyCourses(resp.data)
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyCourses()
  }, [])
  return (
    <div>
      {
        myCourses?.map((c) => (
          <div className='flex items-start justify-start gap-10 bg-white my-5'>
            <CourseCard course={c?.courseDetails} isEnrolled />
            <div className='p-10 w-full'>
              Numbere Of Lectures : {
                c?._doc?.contents?.length
              }
              <br />
              Completed Lectures : {
                c?._doc?.contents?.filter((c) => (c.status === true))?.length
              }
              <h2 className='my-5'>Progresss</h2>
              <div className='flex items-center w-full bg-gray-500 rounded-full'>
                <div className='py-2 bg-gradient-to-r to-green-400 via-green-700 rounded-full from-green-600' style={{width :((c?._doc?.contents?.filter((c) => (c.status === true))?.length / c?._doc?.contents?.length) *100) + '%' }}>

                </div>
              </div>
            </div>
          </div>

        ))
      }
    </div>
  )
}

export default MyProgress