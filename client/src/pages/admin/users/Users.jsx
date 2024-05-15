import authAxios from '../../../utils/authAxios';
import EntityTable from '../../../components/Table/EntityTable';
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../../utils/Constants';
import UserModal from './UserModal';

export default function Users() {
    const initialUser = {
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        role: ''
    }
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTopic, setModalTopic] = useState(String);
  const [modalType, setModalType] = useState(String);

  const fetchData = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/user/all`);
      const modifiedData = response.data.map((user) => ({
        ...user,
        // facultyName: user.faculty.name,
      }));
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const entityColumns = ["_id", "firstName", "lastName", "email", "contactNo", "role"];
  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType("edit");
    setModalTopic("Edit User");
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await authAxios.delete(`/user/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button
          className="mr-3 my-2 float-right bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={() => {
            setModalType("create");
            setModalTopic("Create User");
            setSelectedUser(initialUser);
            setModalVisible(true);
          }}
        >
          Create
        </button>
        <EntityTable
          heading="Users"
          data={data}
          entityColumns={entityColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {modalVisible && (
          <UserModal
            modalType={modalType}
            modalTopic={modalTopic}
            fetchData={fetchData}
            user={selectedUser}
            onClose={() => setModalVisible(false)}
          />
        )}
      </div>
    </div>
  );
}
