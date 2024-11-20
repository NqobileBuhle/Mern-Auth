import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa'; // Importing icons

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

interface CarCardProps {
  car: Car;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void; // Add a favorite action handler
}

const CarCard: React.FC<CarCardProps> = ({ car, onDelete, onFavorite }) => {
  return (
    <div className="relative bg-slate-300 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <img
        src={car.image || 'https://via.placeholder.com/150'}
        alt={`${car.make} ${car.model}`}
        className="rounded-t-lg object-cover w-full h-48"
      />

      {/* Favorite Icon */}
      <div
        onClick={() => onFavorite(car._id)}
        className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-600"
      >
        <FaHeart size={24} />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {car.make} {car.model}
        </h2>
        {/* <p className="text-sm text-gray-600">Year: {car.year}</p>
        <p className="text-sm text-gray-600">Price: ${car.price}</p> */}

        {/* Actions */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/cars/edit/${car._id}`}
            className="text-blue-900 hover:text-blue-700"
          >
            <FaEdit size={20} />
          </Link>
          <button
            onClick={() => onDelete(car._id)}
            className="text-slate-500 hover:text-slate-700"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
