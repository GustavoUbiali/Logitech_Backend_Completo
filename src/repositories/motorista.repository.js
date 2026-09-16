const pool = require('../config/database');
const BaseRepository = require('./base.repository');
class MotoristaRepository extends BaseRepository {
  constructor() { super('motoristas'); }
  async create(data) {
    const [r] = await pool.query(
      'INSERT INTO motoristas (nome, cpf, cnh, telefone, email, status) VALUES (?, ?, ?, ?, ?, ?)',
      [data.nome, data.cpf, data.cnh, data.telefone || null, data.email || null, data.status || 'ATIVO']
    );
    return this.findById(r.insertId);
  }
  async update(id, data) {
    const fields = ['nome','cpf','cnh','telefone','email','status'];
    const sets = []; const values = [];
    for (const f of fields) if (data[f] !== undefined) { sets.push(`${f} = ?`); values.push(data[f]); }
    if (!sets.length) return this.findById(id);
    values.push(id);
    await pool.query(`UPDATE motoristas SET ${sets.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
}
module.exports = new MotoristaRepository();
