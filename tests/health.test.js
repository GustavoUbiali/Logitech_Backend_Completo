const request = require('supertest');
const app = require('../src/app');

describe('Healthcheck e erros básicos', () => {
  test('GET /health deve retornar 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('rota inexistente deve retornar 404 em JSON', async () => {
    const response = await request(app).get('/nao-existe');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Rota não encontrada');
  });
});
