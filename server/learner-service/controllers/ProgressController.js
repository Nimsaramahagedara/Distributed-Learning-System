import ProgressModel from "../models/ProgressModel.js";
import axios from 'axios'
export const createProgress = async (req, res) => {
    try {
        const data = req.body;
        const content = await axios.get(`${process.env.GATEWAY_ADDRESS}/course/content/course/${data?.courseId}`)
        console.log(content.data);
        const updatedProgress = {
            ...data,
            contents: content.data
        }
        const course = await ProgressModel.create(updatedProgress);
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getMyProgress = async (req, res) => {
    try {
        const { userid } = req.body
        console.log(req.body);
        const courses = await ProgressModel.find({ userId: userid });
        const cDetailsPromise = courses.map(async (c) => {
            const resp = await axios.get(`${process.env.GATEWAY_ADDRESS}/course/${c?.courseId}`)
            if (resp?.data)
                return {
                    ...c,
                    courseDetails: resp.data
                }
            else
                return c
        })

        const allCourses = await Promise.all(cDetailsPromise)
        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    const { userid } = req.body
    try {
        const course = await ProgressModel.find({ courseId: id, userId: userid });
        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseByInstructorId = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await ProgressModel.find({ instructorId: id });
        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await ProgressModel.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProgress = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await ProgressModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
