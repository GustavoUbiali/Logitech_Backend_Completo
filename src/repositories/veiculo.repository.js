const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class VeiculoRepository extends BaseRepository {
  constructor() { super('veiculos'); }
  async create(data) {
    const [r] = await pool.query(
      'INSERT INTO veiculos (placa, modelo, tipo, capacidade_kg, status, motorista_id) VALUES (?, ?, ?, ?, ?, ?)',
      [data.placa, data.modelo, data.tipo, data.capacidade_kg, data.status || 'DISPONIVEL', data.motorista_id || null]
    );
    return this.findById(r.insertId);
  }
  async update(id, data) {
    const fields = ['placa','modelo','tipo','capacidade_kg','status','motorista_id'];
    const sets = []; const values = [];
    for (const f of fields) if (data[f] !== undefined) { sets.push(`${f} = ?`); values.push(data[f]); }
    if (!sets.length) return this.findById(id);
    values.push(id);
    await pool.query(`UPDATE veiculos SET ${sets.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
}
module.exports = new VeiculoRepository();
