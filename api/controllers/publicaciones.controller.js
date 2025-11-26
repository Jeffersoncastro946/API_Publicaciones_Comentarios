import postsService from "../services/publicaciones.service.js";
import { response } from "../utils/response.js";
import postModel from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const search = (req.query.q || "").trim();
    // const data = await postsService.getAllPosts();
    let data;
    if (search) {
      //viene con busqueda
      data = await postsService.searchPosts(search);
    } else {
      // viene sin busqueda
      data = await postsService.getAllPosts();
    }
    return response.success({ res, data });
  } catch (e) {
    console.error(e);
    return response.serverError({ res });
  }
};

export const getPostByID = async (req, res) => {
  try {
    const postID = req.params.id;
    const data = await postsService.getPostByID(postID);
    if (data.length === 0) {
      return response.clientError({
        res,
        code: 404,
        message: "Este recurso no existe",
      });
    }
    return response.success({ res, data });
  } catch (e) {
    console.error(e);
    return response.clientError({ res });
  }
};

export const createPost = async (req, res) => {
  const { id: user_id } = req.user;
  if (!user_id) {
    return response.clientError({ res, code: 401, message: "No autenticado" });
  }
  req.body.user_id = user_id;

  const { success, error, data } = postModel.safeParse(req.body);
  if (!success) {
    return response.clientError({ res, message: error.issues });
  }
  try {
    await postsService.createPost(data);
    return response.success({ res });
  } catch (e) {
    console.error(e);
    return response.serverError({ res });
  }
};

export const updatePost = async (req, res) => {
  const postID = req.params.id;

  const { id: user_id } = req.user;
  if (!user_id) {
    return response.clientError({ res, code: 401, message: "No autenticado" });
  }
  req.body.user_id = user_id;

  const { success, error, data } = postModel.safeParse(req.body);
  if (!success) {
    return response.clientError({ res, message: error.issues });
  }

  if (!(await postsService.verifyPostOwner(postID, user_id))) {
    return response.clientError({
      res,
      code: 403,
      message: "No tienes permiso para modificar este recurso",
    });
  }
  try {
    const { affectedRows } = await postsService.updatePost(postID, data);
    if (affectedRows === 0)
      return response.clientError({
        res,
        code: 404,
        message: "Este recurso no existe",
      });

    return response.success({ res });
  } catch (e) {
    console.error(e);
    return response.serverError({ res });
  }
};

export const deletePost = async (req, res) => {
  const postID = req.params.id;

  const { id: user_id } = req.user;
  if (!user_id) {
    return response.clientError({ res, code: 401, message: "No autenticado" });
  }

  if (!(await postsService.verifyPostOwner(postID, user_id))) {
    return response.clientError({
      res,
      code: 403,
      message: "No tienes permiso para eliminar este recurso",
    });
  }
  try {
    const { affectedRows } = await postsService.deletePost(postID);
    if (affectedRows === 0)
      return response.clientError({
        res,
        code: 404,
        message: "Este recurso no existe",
      });

    return response.success({ res });
  } catch (e) {
    console.error(e);
    return response.serverError({ res });
  }
};
