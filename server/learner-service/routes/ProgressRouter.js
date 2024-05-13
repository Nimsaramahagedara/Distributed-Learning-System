import express from 'express';
import { 
    getMyProgress,
    getCourseById,
    createProgress,
    updateProgress,
    deleteCourse,
    getCourseByInstructorId
 } from '../controllers/ProgressController.js';

const progressRouter = express.Router();

progressRouter.get('/all', getMyProgress);
progressRouter.get('/:id', getCourseById);
progressRouter.get('/instructor/:id', getCourseByInstructorId);
progressRouter.post('/', createProgress);
progressRouter.put('/:id', updateProgress);
progressRouter.delete('/:id', deleteCourse);

export default progressRouter;