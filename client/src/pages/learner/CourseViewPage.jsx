import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const CourseViewPage = () => {
    const { id } = useParams()
    const [course, setCourse] = useState({});
    const [content, setContent] = useState([])
    const [searchParams] = useSearchParams()
    const enroll= searchParams.get('enroll')

    const getOneCourse = async () => {
        try {
            const resp = await authAxios.get(`${apiUrl}/course/${id}`);
            const content = await authAxios.get(`${apiUrl}/course/content/course/${id}`)
            console.log(resp.data);
            setCourse(resp.data)
            setContent(content.data)
        } catch (error) {
            console.log(error);
        }
    }
    const handleBuyCourse = async () => {
        try {
            const data = {
                productId: course?._id,
                qty: 1,
                name: course?.name,
                price: course?.fee
            }
            const resp = await authAxios.post(`${apiUrl}/pay`, data)
            console.log(resp.data);
            if (resp?.data?.payUrl) {
                window.location.href = resp.data.payUrl
            } else {
                throw Erro('Error creating paylink')
            }


        } catch (error) {
            console.log(error);
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        getOneCourse()
    }, [])
    return (
        <div className='w-full bg-white rounded-xl p-2'>
            <div className='flex items-stretch justify-start gap-10'>
                <div className='w-1/2 aspect-square'>
                    <img src={course?.image ? course.image : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} className='w-full h-full object-cover' />
                </div>
                <div className='w-full px-10'>
                    <h1 className='text-xl font-bold my-5'>{course?.name}</h1>
                    <h4 className='text-purple-500 mb-10'>Price : {course?.fee}</h4>
                    <p className='text-sm font-sans'>
                        {
                            course?.description
                        }
                    </p>

                    {enroll == 'false' && <div className='flex items-center w-full gap-5 mt-32 mb-0'>
                        <Button variant='contained' onClick={handleBuyCourse} fullWidth>Buy Now</Button>
                        <Button variant='contained' className='text-white max-w-32' fullWidth>🛒</Button>
                    </div>
                    }

                </div>



            </div>
            <div>
                <h1 className='text-2xl font-semibold'>Course Content</h1>

                {enroll == 'false' && <span className='px-4 bg-red-400 rounded-xl py-2 text-white w-full block'>Payment Required</span>}
                <div>
                    {
                     enroll == 'true' &&   content.map((c) => (
                            <div className={`flex items-center justify-between px-4 py-2 border rounded-xl my-2 hover:bg-gray-200 ${c?.status ? '' : 'hidden'}`}>
                                <span className='text-xl font-bold'> {c.title}</span>
                                {
                                    c?.description
                                }
                                <Link to={c?.file} target='_blank'>File</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseViewPage