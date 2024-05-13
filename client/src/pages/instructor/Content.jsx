import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';

export default function Content() {
    const { courseId } = useParams();
    const [Course, setCourse] = useState({});
    
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const response = await authAxios.get(`${apiUrl}/course/${courseId}`);
        setCourse(response);
        console.log(Course);
      } catch (error) {
        console.error(error);
      }
    };

    getCourseData();
  }, []);


    return (
        <div>{courseId}</div>
    )
}
