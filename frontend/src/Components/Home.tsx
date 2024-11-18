import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../Components/CarCard';

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  image: string;
  price: number;
}

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/cars');
        console.log('Fetched cars:', res.data); // Debug log
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    fetchCars();
  }, []);

  // Handle car deletion
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      alert('Car deleted successfully!');
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  return (
   
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Car Inventory</h1>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className="text-red-500">No cars available to display.</p>
        )}
      </div>
    );
    
  
};

export default Home;
