import { Link } from 'react-router-dom';

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
}

const CarCard: React.FC<CarCardProps> = ({ car, onDelete }) => {
  return (
    <div className="bg-slate-300 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={car.image || 'https://via.placeholder.com/150'}
        alt={`${car.make} ${car.model}`}
        className="rounded-t-lg object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          {car.make} {car.model}
        </h2>
        {/* <p className="text-sm text-gray-600">Year: {car.year}</p>
        <p className="text-sm text-gray-600">Price: ${car.price}</p> */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/cars/edit/${car._id}`}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-slate-600"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(car._id)}
            className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
