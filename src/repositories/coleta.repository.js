const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class ColetaRepository extends BaseRepository {
  constructor() { super('coletas'); }
  async create(data) {
    const [r] = await pool.query(
      'INSERT INTO coletas (codigo, rota_id, motorista_id, endereco_origem, cidade, data_agendada, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.codigo, data.rota_id, data.motorista_id, data.endereco_origem, data.cidade, data.data_agendada, data.status || 'AGENDADA']
    );
    return this.findById(r.insertId);
  }
  async update(id, data) {
    const fields = ['codigo','rota_id','motorista_id','endereco_origem','cidade','data_agendada','status'];
    const sets = []; const values = [];
    for (const f of fields) if (data[f] !== undefined) { sets.push(`${f} = ?`); values.push(data[f]); }
    if (!sets.length) return this.findById(id);
    sets.push('updated_at = CURRENT_TIMESTAMP'); values.push(id);
    await pool.query(`UPDATE coletas SET ${sets.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
}
module.exports = new ColetaRepository();
