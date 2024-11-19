import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../Components/CarCard';
import {API_BASE_URL} from '../config';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/cars`);
        console.log('Fetched cars:', res.data);
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      alert('Car deleted successfully!');
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Inventory</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p className="text-gray-500 text-center">Loading cars...</p>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center">No cars available to display.</p>
      )}
    </div>
  );
};

export default Home;
