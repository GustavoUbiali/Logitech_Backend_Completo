const repository = require('../repositories/coleta.repository');
const CrudService = require('../services/crud.service');
const { required } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Coleta');
module.exports = {
  list: base.list, get: base.get, remove: base.remove,
  create: async (req,res,next)=>{ try{ for(const f of ['codigo','rota_id','motorista_id','endereco_origem','cidade','data_agendada']) required(req.body[f],f); res.status(201).json(await repository.create(req.body)); }catch(e){next(e);} },
  update: async (req,res,next)=>{ try{ const data=await repository.update(req.params.id,req.body); if(!data)return res.status(404).json({error:'Coleta não encontrada'}); res.json(data);}catch(e){next(e);} }
};
