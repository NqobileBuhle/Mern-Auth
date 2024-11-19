import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../Components/CarCard';
import HeroSection from './HeroSection';
import AddCar from './AddCar';


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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/cars');
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    fetchCars();
  }, []);

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <HeroSection/>
      
      <h1 className="text-3xl font-bold p-6 mb-5 text-blue-900">
         Browse by Type
      </h1>
      {cars.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} onDelete={handleDelete} />
          ))}
          
        </div>
        
      ) : (
        <p className="text-center text-gray-500">No cars available to display.</p>
      )}
      
    </div>
  );
};

export default Home;
