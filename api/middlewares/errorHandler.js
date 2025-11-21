import { response } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
    console.error("Error no manejado:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";

    if (statusCode >= 500) {
        return response.serverError({
            res,
            code: statusCode,
            message
        });
    }

    return response.clientError({
        res,
        code: statusCode,
        message
    });
};
