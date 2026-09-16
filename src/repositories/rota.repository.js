const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class RotaRepository extends BaseRepository {
  constructor() { super('rotas'); }
  async create(data) {
    const [r] = await pool.query(
      'INSERT INTO rotas (codigo, origem, destino, distancia_km, data_inicio_prevista, data_fim_prevista, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.codigo, data.origem, data.destino, data.distancia_km || 0, data.data_inicio_prevista || null, data.data_fim_prevista || null, data.status || 'PLANEJADA']
    );
    return this.findById(r.insertId);
  }
  async update(id, data) {
    const fields = ['codigo','origem','destino','distancia_km','data_inicio_prevista','data_fim_prevista','status'];
    const sets = []; const values = [];
    for (const f of fields) if (data[f] !== undefined) { sets.push(`${f} = ?`); values.push(data[f]); }
    if (!sets.length) return this.findById(id);
    values.push(id);
    await pool.query(`UPDATE rotas SET ${sets.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
}
module.exports = new RotaRepository();
