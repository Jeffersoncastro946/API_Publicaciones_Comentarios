import mysqlPool from "../config/db/mysql_db";

export class ComentariosService {
  static async GetAllComentarios() {
    const [resultado] = await mysqlPool.query(`
        select * from 
        `);
  }
}
