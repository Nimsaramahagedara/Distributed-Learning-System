import ContentModel from "../models/CourseContentModel.js";

export const createContent = async (req, res) => {
    try {
        const content = await ContentModel.create(req.body);
        return res.status(200).json(content);
    } catch (error) {
        console.error(error);b 
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllContent = async (req, res) => {
    try {
        const contents = await ContentModel.find();
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getContentById = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await ContentModel.findById(id);
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getContentByCourseId = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await ContentModel.find({ courseid : id });
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteContent = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await ContentModel.findByIdAndDelete(id);
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateContent = async (req, res) => {
    const { id } = req.params;
    try {
        const content = await ContentModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!content) {
            return res.status(404).json({ error: "Content not found" });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json(error);
    }
};
