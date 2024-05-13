import express from 'express';
import { 
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    getContentByCourseId
 } from '../controllers/CourseContentController.js';

const contentRouter = express.Router();

contentRouter.get('/', getAllContent);
contentRouter.get('/:id', getContentById);
contentRouter.get('/course/:id', getContentByCourseId);
contentRouter.post('/', createContent);
contentRouter.put('/:id', updateContent);
contentRouter.delete('/:id', deleteContent);

export default contentRouter;