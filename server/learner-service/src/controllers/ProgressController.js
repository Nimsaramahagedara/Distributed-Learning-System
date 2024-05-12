import ProgressModel from "../models/ProgressModel.js";

export const createProgress = async (req, res) => {
    try {
        const course = await ProgressModel.create(req.body);
         res.status(200).json(course);
    } catch (error) {
        console.error(error); 
         res.status(500).json({ message: error.message });
    }
};

export const getMyProgress = async (req, res) => {
    try {
        const {userid} = req.body
        const courses = await  ProgressModel.find({userId:userid});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    const {userid} = req.body
    try {
        const course = await ProgressModel.find({courseId:id,userId:userid});
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
        const course = await   ProgressModel.find({ instructorId : id });
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
        const course = await   ProgressModel.findByIdAndDelete(id);
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
        const course = await   ProgressModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: "course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
