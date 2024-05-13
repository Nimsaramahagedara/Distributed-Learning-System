import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';

export default function Content() {
    const { courseId } = useParams();
    const [Course, setCourse] = useState({});
    const [contents, setContents] = useState([]);
    
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

    const getContents = async () => {
        try {
          const response = await authAxios.get(`${apiUrl}/course/content/course/66405f50c4ebb621ab3e2542`);
          setContents(response);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };
  
    getCourseData();
    getContents();
  }, []);


    return (
        <div>{courseId}</div>
    )
}
