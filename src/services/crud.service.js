class CrudService {
  constructor(repository) { this.repository = repository; }
  list() { return this.repository.findAll(); }
  get(id) { return this.repository.findById(id); }
  remove(id) { return this.repository.deleteById(id); }
}
module.exports = CrudService;
