import request from 'supertest';
import app from '../server.js'; // Import your Express app

describe('Car API Endpoints', () => {
  it('GET /api/cars - should fetch all cars', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('POST /api/cars - should add a new car', async () => {
    const newCar = { make: 'Honda', model: 'Civic', year: 2021, price: 22000 };
    const res = await request(app).post('/api/cars').send(newCar);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.make).toBe('Honda');
  });

  it('PUT /api/cars/:id - should update a car', async () => {
    const carId = 'exampleCarId'; // Replace with a real ID from your database
    const updatedCar = { price: 23000 };
    const res = await request(app).put(`/api/cars/${carId}`).send(updatedCar);
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(23000);
  });

  it('DELETE /api/cars/:id - should delete a car', async () => {
    const carId = 'exampleCarId'; // Replace with a real ID from your database
    const res = await request(app).delete(`/api/cars/${carId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Car deleted successfully');
  });
});
