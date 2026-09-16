const pool = require('../config/database');

class BaseRepository {
  constructor(table) { this.table = table; }

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async deleteById(id) {
    const [result] = await pool.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}
module.exports = BaseRepository;
