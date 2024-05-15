import CourseModel from "../models/CourseModel.js";

export const createCourse = async (req, res) => {
    try {
        const course = await CourseModel.create(req.body);
        return res.status(201).json(course);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await CourseModel.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCourseByInstructorId = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await CourseModel.find({ instructorId : id });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await CourseModel.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await CourseModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error);
    }
};
