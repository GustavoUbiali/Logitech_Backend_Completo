const router = require('express').Router();
const c = require('../controllers/veiculo.controller');
router.get('/', c.list); router.get('/:id', c.get); router.post('/', c.create); router.put('/:id', c.update); router.delete('/:id', c.remove);
module.exports = router;
