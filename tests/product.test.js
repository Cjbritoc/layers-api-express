import request from 'supertest';
import { jest } from '@jest/globals'; // Import jest from @jest/globals

// Mock the Firebase database connection
jest.unstable_mockModule('../src/config/db.js', () => ({
  default: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
      })),
      get: jest.fn(),
      add: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  },
}));

// Mock the entire productService module using unstable_mockModule for ES Modules
const mockProductService = {
  getAll: jest.fn(),
  createProduct: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
};

jest.unstable_mockModule('../src/services/product.service.js', () => ({
  default: mockProductService,
}));

let app;
let productService;

describe('Product API', () => {
  let server;

  beforeAll(async () => {
    // Dynamically import app and productService after the mocks are defined
    const appModule = await import('../src/server.js');
    app = appModule.default;
    const productServiceModule = await import('../src/services/product.service.js');
    productService = productServiceModule.default;
    server = app.listen(4000);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test GET /api/v1/products
  test('GET /api/v1/products should return all products', async () => {
    productService.getAll.mockResolvedValue([
      { id: '1', nombre: 'Product 1', precio: 100, disponible: true },
      { id: '2', nombre: 'Product 2', precio: 200, disponible: false },
    ]);

    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(2);
    expect(productService.getAll).toHaveBeenCalledTimes(1);
  });

  test('GET /api/v1/products should return an empty array if no products', async () => {
    productService.getAll.mockResolvedValue([]);

    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(0);
    expect(productService.getAll).toHaveBeenCalledTimes(1);
  });

  // Test POST /api/v1/products - Valid data
  test('POST /api/v1/products should create a new product with valid data', async () => {
    const newProduct = {
      nombre: 'Test Product',
      precio: 99.99,
      disponible: true,
    };
    productService.createProduct.mockResolvedValue(newProduct);

    const res = await request(app)
      .post('/api/v1/products')
      .send(newProduct);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toMatchObject(newProduct);
    expect(productService.createProduct).toHaveBeenCalledTimes(1);
    expect(productService.createProduct).toHaveBeenCalledWith(newProduct);
  });

  // Test POST /api/v1/products - Invalid data (missing fields)
  test('POST /api/v1/products should return 400 for invalid data (missing fields)', async () => {
    const invalidProduct = {
      precio: 10.00,
    };
    const res = await request(app)
      .post('/api/v1/products')
      .send(invalidProduct);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('error');
    expect(typeof res.body.error).toBe('object');
    expect(res.body.error).toHaveProperty('0', 'El nombre debe ser un texto.');
    expect(res.body.error).toHaveProperty('1', 'El nombre es requerido.');
    expect(productService.createProduct).not.toHaveBeenCalled(); // Should not call service on validation error
  });

  // Test GET /api/v1/products/:id - Valid ID
  test('GET /api/v1/products/:id should return a product by ID', async () => {
    const mockProduct = { id: '1', nombre: 'Product 1', precio: 100, disponible: true };
    productService.getById.mockResolvedValue(mockProduct);

    const res = await request(app).get('/api/v1/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data', mockProduct);
    expect(productService.getById).toHaveBeenCalledTimes(1);
    expect(productService.getById).toHaveBeenCalledWith('1');
  });

  // Test GET /api/v1/products/:id - Non-existent ID
  test('GET /api/v1/products/:id should return 404 for non-existent ID', async () => {
    productService.getById.mockImplementation(() => {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    });

    const res = await request(app).get('/api/v1/products/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('error', 'Not Found');
    expect(productService.getById).toHaveBeenCalledTimes(1);
    expect(productService.getById).toHaveBeenCalledWith('9999');
  });

  // Test GET /api/v1/products/:id - Invalid ID format
  test('GET /api/v1/products/:id should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/api/v1/products/abc');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(typeof res.body.error).toBe('object');
    expect(res.body.error).toHaveProperty('0', 'El ID debe ser un número.');
    expect(productService.getById).not.toHaveBeenCalled(); // Should not call service on validation error
  });

  // Test DELETE /api/v1/products/:id - Valid ID
  test('DELETE /api/v1/products/:id should delete a product by ID', async () => {
    productService.deleteById.mockResolvedValue({ id: '2' });

    const res = await request(app).delete('/api/v1/products/2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id', '2');
    expect(productService.deleteById).toHaveBeenCalledTimes(1);
    expect(productService.deleteById).toHaveBeenCalledWith('2');
  });

  // Test DELETE /api/v1/products/:id - Non-existent ID
  test('DELETE /api/v1/products/:id should return 404 for non-existent ID', async () => {
    productService.deleteById.mockImplementation(() => {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    });

    const res = await request(app).delete('/api/v1/products/9999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('status', 'error');
    expect(res.body).toHaveProperty('error', 'Not Found');
    expect(productService.deleteById).toHaveBeenCalledTimes(1);
    expect(productService.deleteById).toHaveBeenCalledWith('9999');
  });

  // Test DELETE /api/v1/products/:id - Invalid ID format
  test('DELETE /api/v1/products/:id should return 400 for invalid ID format', async () => {
    const res = await request(app).delete('/api/v1/products/xyz');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status', 'error');
    expect(typeof res.body.error).toBe('object');
    expect(res.body.error).toHaveProperty('0', 'El ID debe ser un número.');
    expect(productService.deleteById).not.toHaveBeenCalled(); // Should not call service on validation error
  });
});
