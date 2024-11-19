// AddCar.tsx
import React, { useState } from 'react';


interface CarFormData {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

const AddCar: React.FC = () => {
  const [carData, setCarData] = useState<CarFormData>({
    make: '',
    model: '',
    year: 0,
    color: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading

    // Validate if the car data is filled
    if (
      !carData.make ||
      !carData.model ||
      !carData.year ||
      !carData.color ||
      !carData.price
    ) {
      console.log('Please fill in all fields.');
      return;
    }

    // Send data to the backend
    try {
      console.log('Form submitted');
      const response = await fetch('http://localhost:5001/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      const data = await response.json();
      console.log('Car added successfully:', data);

      // Optionally reset form fields after successful submission
      setCarData({
        make: '',
        model: '',
        year: 0,
        color: '',
        price: 0,
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-8 mt-10 bg-slate-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold  text-blue-500 text-center mb-4">Add A Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">
            Make
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={carData.make}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={carData.color}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-700"
        >
          Add Car
        </button>
      </form>
    </section>
  );
};

export default AddCar;
