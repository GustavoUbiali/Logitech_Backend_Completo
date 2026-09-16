const express = require('express');
const cors = require('cors');
const motoristaRoutes = require('./routes/motorista.routes');
const veiculoRoutes = require('./routes/veiculo.routes');
const rotaRoutes = require('./routes/rota.routes');
const entregaRoutes = require('./routes/entrega.routes');
const coletaRoutes = require('./routes/coleta.routes');
const itemRoutes = require('./routes/item.routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'logitech-express-api' });
});

app.use('/api/motoristas', motoristaRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/rotas', rotaRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/coletas', coletaRoutes);
app.use('/api/itens', itemRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
