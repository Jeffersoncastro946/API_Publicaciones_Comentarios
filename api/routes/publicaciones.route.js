import {Router} from 'express';
import {createPost, deletePost, getAllPosts, getPostByID, updatePost}
    from "../controllers/publicaciones.controller.js";

const pubRouter = Router();

pubRouter.get('/', getAllPosts);
pubRouter.get('/:id', getPostByID);
pubRouter.post('/', createPost);
pubRouter.put('/:id', updatePost);
pubRouter.delete('/:id', deletePost);

export default pubRouter;