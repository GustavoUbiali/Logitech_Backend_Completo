const repository = require('../repositories/veiculo.repository');
const CrudService = require('../services/crud.service');
const { required, positiveNumber } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Veículo');
module.exports = {
  list: base.list, get: base.get, remove: base.remove,
  create: async (req,res,next)=>{ try{ required(req.body.placa,'placa'); required(req.body.modelo,'modelo'); required(req.body.tipo,'tipo'); required(req.body.capacidade_kg,'capacidade_kg'); positiveNumber(req.body.capacidade_kg,'capacidade_kg'); res.status(201).json(await repository.create(req.body)); }catch(e){next(e);} },
  update: async (req,res,next)=>{ try{ const data=await repository.update(req.params.id,req.body); if(!data)return res.status(404).json({error:'Veículo não encontrado'}); res.json(data);}catch(e){next(e);} }
};
