import express from 'express';
import { 
    getMyProgress,
    getCourseById,
    createProgress,
    updateProgress,
    deleteCourse,
    getCourseByInstructorId,
    getProgressById
 } from '../controllers/ProgressController.js';
import { loginValidator } from '../middlewares/loginValidator.js';

const progressRouter = express.Router();

progressRouter.get('/all',loginValidator, getMyProgress);
progressRouter.get('/:id', getCourseById);
progressRouter.get('/progress/:id/:cid', getProgressById);
progressRouter.get('/instructor/:id', getCourseByInstructorId);
progressRouter.post('/', createProgress);
progressRouter.put('/:id', updateProgress);
progressRouter.delete('/:id', deleteCourse);

export default progressRouter;