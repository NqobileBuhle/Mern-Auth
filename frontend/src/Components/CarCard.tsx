import { Link } from 'react-router-dom';

// Define the Car interface
interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

// Define the props for the CarCard component
interface CarCardProps {
  car: Car;
  onDelete: (id: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onDelete }) => {
  if (!car) {
    console.error('Car object is undefined:', car); // Debugging if car is undefined
    return null; // Early return to avoid rendering if car is invalid
  }

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={car.image || 'https://via.placeholder.com/150'} // Fallback image if no URL is provided
        alt={`${car.make || 'Unknown'} ${car.model || 'Car'}`} // Fallback alt text
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-bold">
        {car.make || 'Unknown Make'} {car.model || 'Unknown Model'}
      </h2>
      <p>Year: {car.year || 'N/A'}</p>
      <p>Price: ${car.price || 'N/A'}</p>
      <div className="mt-4 flex justify-between">
        <Link
          to={`/cars/edit/${car._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(car._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarCard;
