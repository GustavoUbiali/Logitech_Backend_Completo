const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class EntregaRepository extends BaseRepository {
  constructor() { super('entregas'); }
  async create(data) {
    const [r] = await pool.query(
      `INSERT INTO entregas (codigo_rastreio, rota_id, motorista_id, veiculo_id, destinatario_nome, endereco, cidade, peso_kg, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.codigo_rastreio, data.rota_id, data.motorista_id, data.veiculo_id, data.destinatario_nome, data.endereco, data.cidade, data.peso_kg, data.status || 'PENDENTE']
    );
    return this.findById(r.insertId);
  }
  async updateStatus(id, status) {
    await pool.query('UPDATE entregas SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    return this.findById(id);
  }
  async update(id, data) {
    const fields = ['codigo_rastreio','rota_id','motorista_id','veiculo_id','destinatario_nome','endereco','cidade','peso_kg','status'];
    const sets = []; const values = [];
    for (const f of fields) if (data[f] !== undefined) { sets.push(`${f} = ?`); values.push(data[f]); }
    if (!sets.length) return this.findById(id);
    sets.push('updated_at = CURRENT_TIMESTAMP'); values.push(id);
    await pool.query(`UPDATE entregas SET ${sets.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
}
module.exports = new EntregaRepository();
