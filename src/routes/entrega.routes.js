const router = require('express').Router();
const c = require('../controllers/entrega.controller');
router.get('/', c.list); router.get('/:id', c.get); router.post('/', c.create); router.put('/:id', c.update); router.patch('/:id/status', c.updateStatus); router.delete('/:id', c.remove);
module.exports = router;
