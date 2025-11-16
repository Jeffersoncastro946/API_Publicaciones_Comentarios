import * as zod from 'zod'

const postModel = zod.object({
    id: zod.guid().optional(),
    title: zod.string().min(3).max(100),
    description: zod.string().min(3).max(100).nullable(),
    user_id: zod.guid(),
    created_at: zod.iso.datetime().nullable()
}).strict()

export default postModel;