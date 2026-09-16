const repository = require('../repositories/entrega.repository');
const CrudService = require('../services/crud.service');
const { required, positiveNumber } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Entrega');
const STATUS = new Set(['PENDENTE','EM_TRANSITO','ENTREGUE','CANCELADA']);
module.exports = {
  list: base.list, get: base.get, remove: base.remove,
  create: async (req,res,next)=>{ try{ for(const f of ['codigo_rastreio','rota_id','motorista_id','veiculo_id','destinatario_nome','endereco','cidade','peso_kg']) required(req.body[f],f); positiveNumber(req.body.peso_kg,'peso_kg'); res.status(201).json(await repository.create(req.body)); }catch(e){next(e);} },
  update: async (req,res,next)=>{ try{ const data=await repository.update(req.params.id,req.body); if(!data)return res.status(404).json({error:'Entrega não encontrada'}); res.json(data);}catch(e){next(e);} },
  updateStatus: async (req,res,next)=>{ try{ required(req.body.status,'status'); if(!STATUS.has(req.body.status)){const e=new Error('Status de entrega inválido'); e.status=400; throw e;} const data=await repository.updateStatus(req.params.id,req.body.status); if(!data)return res.status(404).json({error:'Entrega não encontrada'}); res.json(data);}catch(e){next(e);} }
};
