import postsService from "../services/publicaciones.service.js";
import {response} from "../utils/response.js";

export const  getAllPosts = async (req, res) => {
    try {
        const data = await postsService.getAllPosts();
        return response.success({res,data})
    }catch (e){
        console.error(e)
        return response.serverError({res,message:e});
    }

}

export const  getPostByID = async (req, res) => {
    try {
        const postID = req.params.id;
        const data = await postsService.getPostByID(postID);
        return response.success({res, data});
    }catch (e){
        return response.clientError({res,message:e});
    }
}