const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class ItemRepository extends BaseRepository {
  constructor() { super('itens'); }
  async findAllWithStock() {
    const [rows] = await pool.query(`
      SELECT i.id, i.nome, i.categoria, i.unidade_medida, i.estoque_minimo,
             COALESCE(e.quantidade, 0) AS quantidade_estoque
      FROM itens i LEFT JOIN estoque e ON e.item_id = i.id
      ORDER BY i.nome`);
    return rows;
  }
  async create(data) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [r] = await conn.query(
        'INSERT INTO itens (nome, categoria, unidade_medida, estoque_minimo) VALUES (?, ?, ?, ?)',
        [data.nome, data.categoria, data.unidade_medida || 'UN', data.estoque_minimo || 0]
      );
      await conn.query('INSERT INTO estoque (item_id, quantidade) VALUES (?, ?)', [r.insertId, data.quantidade_inicial || 0]);
      await conn.commit();
      return this.findById(r.insertId);
    } catch (e) { await conn.rollback(); throw e; } finally { conn.release(); }
  }
}
module.exports = new ItemRepository();
