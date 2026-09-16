const router = require('express').Router();
const c = require('../controllers/item.controller');
router.get('/', c.list); router.get('/:id', c.get); router.post('/', c.create); router.delete('/:id', c.remove);
module.exports = router;
