import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car } from '../interfaces/Car';

const EditCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Partial<Car>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get<Car>(`/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: name === 'year' || name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleUpdate = async () => {
    if (!car.make || !car.model || !car.year || !car.price) {
      alert('Please fill in all fields before updating.');
      return;
    }

    try {
      await axios.put(`/api/cars/${id}`, car);
      navigate('/');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Edit Car</h2>
      <input
        type="text"
        name="make"
        value={car.make || ''}
        onChange={handleInputChange}
        placeholder="Make"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="model"
        value={car.model || ''}
        onChange={handleInputChange}
        placeholder="Model"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="year"
        value={car.year || ''}
        onChange={handleInputChange}
        placeholder="Year"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        name="price"
        value={car.price || ''}
        onChange={handleInputChange}
        placeholder="Price"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-slate-500 text-white p-2 rounded hover:bg-blue-900"
      >
        Update
      </button>
    </div>
  );
};

export default EditCar;
