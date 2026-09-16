const repository = require('../repositories/rota.repository');
const CrudService = require('../services/crud.service');
const { required, positiveNumber } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Rota');
module.exports = {
  list: base.list, get: base.get, remove: base.remove,
  create: async (req,res,next)=>{ try{ required(req.body.codigo,'codigo'); required(req.body.origem,'origem'); required(req.body.destino,'destino'); positiveNumber(req.body.distancia_km,'distancia_km'); res.status(201).json(await repository.create(req.body)); }catch(e){next(e);} },
  update: async (req,res,next)=>{ try{ const data=await repository.update(req.params.id,req.body); if(!data)return res.status(404).json({error:'Rota não encontrada'}); res.json(data);}catch(e){next(e);} }
};
