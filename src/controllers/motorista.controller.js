const repository = require('../repositories/motorista.repository');
const CrudService = require('../services/crud.service');
const { required } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Motorista');
module.exports = {
  list: base.list,
  get: base.get,
  remove: base.remove,
  create: async (req, res, next) => { try { required(req.body.nome,'nome'); required(req.body.cpf,'cpf'); required(req.body.cnh,'cnh'); res.status(201).json(await repository.create(req.body)); } catch(e){ next(e); } },
  update: async (req, res, next) => { try { const data = await repository.update(req.params.id, req.body); if(!data) return res.status(404).json({error:'Motorista não encontrado'}); res.json(data); } catch(e){next(e);} }
};
