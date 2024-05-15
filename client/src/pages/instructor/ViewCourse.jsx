import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "../../components/Loader/Loader";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    fee: "",
    description: "",
  });

  const getCourse = async () => {
    try {
      const resp = await authAxios.get(`${apiUrl}/course/${id}`);
      setCourse(resp.data);
      setEditedCourse(resp.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "An error occurred while fetching courses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCourse();
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          error.message || "An error occurred while fetching user details."
        );
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateCourse = async () => {
    try {
      await authAxios.put(`${apiUrl}/course/${editedCourse._id}`, editedCourse);
      toast.success("Update Successfull");
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the course.");
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await authAxios.delete(`${apiUrl}/course/${editedCourse._id}`);
      navigate("/instruct");
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the course.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full bg-white rounded-xl p-2">
      <div className="flex items-stretch justify-start gap-10">
        <div className="w-1/2 aspect-square">
          <img
            src={
              editedCourse.image
                ? editedCourse.image
                : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full px-10">
          <input
            type="text"
            name="name"
            value={editedCourse.name}
            onChange={handleInputChange}
            className="text-xl font-bold my-5 w-full border-b-2 border-gray-300"
          />
          <input
            type="text"
            name="fee"
            value={editedCourse.fee}
            onChange={handleInputChange}
            className="text-purple-500 mb-10 w-full border-b-2 border-gray-300"
          />
          <textarea
            name="description"
            value={editedCourse.description}
            onChange={handleInputChange}
            className="text-sm font-sans w-full border-b-2 border-gray-300"
          />

          <div className="flex items-center w-full gap-5 mt-32 mb-0">
            <Button variant="contained" fullWidth onClick={handleUpdateCourse}>
              Update
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "#ffcccc",
                },
              }}
              onClick={handleDeleteCourse}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
