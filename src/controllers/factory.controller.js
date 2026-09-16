function createCrudController(service, name) {
  return {
    list: async (_req, res, next) => { try { res.json(await service.list()); } catch (e) { next(e); } },
    get: async (req, res, next) => {
      try {
        const data = await service.get(req.params.id);
        if (!data) return res.status(404).json({ error: `${name} não encontrado` });
        return res.json(data);
      } catch (e) { return next(e); }
    },
    remove: async (req, res, next) => {
      try {
        const ok = await service.remove(req.params.id);
        if (!ok) return res.status(404).json({ error: `${name} não encontrado` });
        return res.status(204).send();
      } catch (e) { return next(e); }
    }
  };
}
module.exports = createCrudController;
