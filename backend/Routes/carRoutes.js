import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// POST a new car
router.post('/', async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Add this line
      const { make, model, year, price, image } = req.body;
  
      const newCar = await Car.create({ make, model, year, price, image });
      res.status(201).json(newCar);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create car' });
    }
  });
  
// PUT to update a car
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { make, model, year, price },
      { new: true }
    );
    if (!updatedCar) return res.status(404).json({ error: 'Car not found' });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update car' });
  }
});

// DELETE a car
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete car' });
  }
});

// Export the router as a default export
export default router;
