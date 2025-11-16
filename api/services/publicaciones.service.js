import pool from '../config/db/mysql_db.js'

export class PostsService{
    static async getAllPosts(){
        const [result] = await  pool.query(`
            SELECT 
                BIN_TO_UUID(id) AS id,
                title, 
                description, 
                BIN_TO_UUID(user_id) AS user_id,
                created_at FROM publicaciones
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

    static async createPost(userID){
        const [result] = pool.query(`
        INSERT INTO publicaciones (id, title, description, user_id, created_at)
        VALUES (
            UUID_TO_BIN(UUID()),
            "Nueva Publicación",
            "Descripción de la nueva publicación",
            UUID_TO_BIN(:userID),
            NOW()
        );
        `, {userID})

        return result;
    }
}

export default PostsService;