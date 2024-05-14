import axios from 'axios';
import React, { useEffect, useState } from 'react'
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import CourseCard from '../../components/Course/CourseCard';

const MyProgress = () => {
  const [myCourses, setMyCourses] = useState()
  const getMyCourses =async()=>{
    try {
      const resp = await authAxios.get(`${apiUrl}/learn/all`)
      setMyCourses(resp.data)
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getMyCourses()
  },[])
  return (
    <div>
      {
        myCourses?.map((c)=>(
          <CourseCard course={c?.courseDetails} isEnrolled/>
        ))
      }
    </div>
  )
}

export default MyProgress