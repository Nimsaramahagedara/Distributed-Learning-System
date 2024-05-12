import express from 'express';
import { 
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseByInstructorId
 } from '../controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.get('/instructor/:id', getCourseByInstructorId);
courseRouter.post('/', createCourse);
courseRouter.put('/:id', updateCourse);
courseRouter.delete('/:id', deleteCourse);

export default courseRouter;