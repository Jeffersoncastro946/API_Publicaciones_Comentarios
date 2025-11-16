import {Router} from 'express';
import {getAllPosts, getPostByID} from "../controllers/publicaciones.controller.js";

const pubRouter = Router();

pubRouter.get('/', getAllPosts)
pubRouter.get('/:id', getPostByID)

export default pubRouter;