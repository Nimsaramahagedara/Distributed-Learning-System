import authAxios from '../../../utils/authAxios';
import EntityTable from '../../../components/Table/EntityTable';
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../utils/Constants';
import CourseModal from './CourseModal';

export default function Course() {
    const initialCourse = {
        id: '',
        name: '',
        description: '',
        fee: '',
        instructorId: '',
    }
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [instructors, setInstructors] = useState([]);
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTopic, setModalTopic] = useState(String);
  const [modalType, setModalType] = useState(String);

  const fetchInstructorData = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/all`);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getInstructorName = (instructorId, instructorsData) => {
    const instructor = instructorsData.find((inst) => inst._id === instructorId);
    return instructor ? `${instructor.firstName} ${instructor.lastName}` : 'Unknown';
  };

  const fetchData = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/course`);
      const modifiedData = response.data.map((course) => ({
        ...course,
        instructor: getInstructorName(course.instructorId, instructors),
      }));
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const entityColumns = ["_id", "name", "description", "fee", "instructor"];
  const handleEdit = (user) => {
    setSelectedCourse(user);
    setModalType("edit");
    setModalTopic("Edit Course");
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await authAxios.delete(`${apiUrl}/course/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
    fetchInstructorData();
  }, []);

  return (
    <div>
      <div>
        <button
          className="mr-3 my-2 float-right bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={() => {
            setModalType("create");
            setModalTopic("Create Course");
            setSelectedCourse(initialCourse);
            setModalVisible(true);
          }}
        >
          Create
        </button>
        <EntityTable
          heading="Courses"
          data={data}
          entityColumns={entityColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {modalVisible && (
          <CourseModal
            modalType={modalType}
            modalTopic={modalTopic}
            fetchData={fetchData}
            user={selectedCourse}
            onClose={() => setModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
}
