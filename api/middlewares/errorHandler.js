export const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(500).send({
        message: err.message || "Ocurrió un error",
    })
    next();
}
