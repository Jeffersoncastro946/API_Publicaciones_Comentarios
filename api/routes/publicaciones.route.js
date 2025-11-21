import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostByID,
  updatePost
} from '../controllers/publicaciones.controller.js';

import { verifyToken } from '../middlewares/verifyToken.js';

const pubRouter = Router();

pubRouter.get('/', getAllPosts);
pubRouter.get('/:id', getPostByID);

pubRouter.post('/', verifyToken, createPost);
pubRouter.put('/:id', verifyToken, updatePost);
pubRouter.delete('/:id', verifyToken, deletePost);

export default pubRouter;
