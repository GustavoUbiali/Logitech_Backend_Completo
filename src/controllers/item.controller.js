const repository = require('../repositories/item.repository');
const CrudService = require('../services/crud.service');
const { required, positiveNumber } = require('../validators/common');
const service = new CrudService(repository);
const base = require('./factory.controller')(service, 'Item');
module.exports = {
  list: async (_req,res,next)=>{try{res.json(await repository.findAllWithStock());}catch(e){next(e);}},
  get: base.get,
  remove: base.remove,
  create: async(req,res,next)=>{try{required(req.body.nome,'nome'); required(req.body.categoria,'categoria'); positiveNumber(req.body.estoque_minimo,'estoque_minimo'); positiveNumber(req.body.quantidade_inicial,'quantidade_inicial'); res.status(201).json(await repository.create(req.body));}catch(e){next(e);}}
};
