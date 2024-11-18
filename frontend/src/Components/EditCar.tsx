import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car } from '../interfaces/Car';

const EditCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Partial<Car>>({});

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get<Car>(`/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/cars/${id}`, car);
      navigate('/');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <input
        type="text"
        value={car.make || ''}
        onChange={(e) => setCar({ ...car, make: e.target.value })}
        placeholder="Make"
      />
      <input
        type="text"
        value={car.model || ''}
        onChange={(e) => setCar({ ...car, model: e.target.value })}
        placeholder="Model"
      />
      <input
        type="number"
        value={car.year || ''}
        onChange={(e) => setCar({ ...car, year: parseInt(e.target.value) })}
        placeholder="Year"
      />
      <input
        type="number"
        value={car.price || ''}
        onChange={(e) => setCar({ ...car, price: parseFloat(e.target.value) })}
        placeholder="Price"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditCar;
