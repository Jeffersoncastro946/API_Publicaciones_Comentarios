import pool from '../config/db/mysql_db.js'

export class PostsService{
    static async getAllPosts(){
        const [result] = await  pool.query(`
            SELECT 
                BIN_TO_UUID(id) AS id,
                title, 
                description, 
                BIN_TO_UUID(user_id) AS user_id,
                created_at 
            FROM publicaciones
            ORDER BY created_at DESC
            `);
        return result;
    }

    static async getPostByID(postID){
        const [result] = await pool.query(`
            SELECT BIN_TO_UUID(id) AS id,
                   title,
                   description,
                   BIN_TO_UUID(user_id) AS user_id, 
                   created_at
            FROM publicaciones
            WHERE id = UUID_TO_BIN(:postID)
        `,{postID})

        return result;
    }

    static async createPost(postData){
        const {title, description, user_id} = postData;
        const [result] = await pool.query(`
        INSERT INTO publicaciones (id, title, description, user_id, created_at)
        VALUES (
            UUID_TO_BIN(UUID()),
            :title,
            :description,
            UUID_TO_BIN(:user_id),
            NOW()
        );
        `, {user_id, title, description});
        return result;
    }

    static async updatePost(postID, postData){
        const {title, description} = postData;
        const [result] = await pool.query(`
        UPDATE publicaciones
        SET title = :title,
            description = :description
        WHERE id = UUID_TO_BIN(:postID);
        `, {postID, title, description});
        return result;
    }

    static async verifyPostOwner(postID, userID){
        const [result] = await pool.query(`
        SELECT COUNT(*) AS count
        FROM publicaciones
        WHERE id = UUID_TO_BIN(:postID)
          AND user_id = UUID_TO_BIN(:userID);
        `, {postID, userID});
        return result[0].count > 0;
    }

    static async deletePost(postID){
        const [result] = await pool.query(`
        DELETE FROM publicaciones
        WHERE id = UUID_TO_BIN(:postID);
        `, {postID});
        return result;
    }
}

export default PostsService;