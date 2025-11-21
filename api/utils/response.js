export class response {
    static success({
        res,
        code = 200,
        message = "Done successfully",
        data = null
    }) {
        return res.status(code).json({
            success: code < 300,
            message,
            data
        });
    }

    static clientError({
        res,
        code = 400,
        message = "Bad request"
    }) {
        return this.success({ res, code, message, data: null });
    }

    static serverError({
        res,
        code = 500,
        message = "Internal server error"
    }) {
        return this.success({ res, code, message, data: null });
    }
}
