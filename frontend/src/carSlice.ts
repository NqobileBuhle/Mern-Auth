import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
}

interface CarState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  loading: false,
  error: null,
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    fetchCarsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCarsSuccess(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
      state.loading = false;
    },
    fetchCarsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addCar(state, action: PayloadAction<Car>) {
      state.cars.push(action.payload);
    },
    deleteCar(state, action: PayloadAction<string>) {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
  },
});

export const {
  fetchCarsStart,
  fetchCarsSuccess,
  fetchCarsFailure,
  addCar,
  deleteCar,
} = carSlice.actions;

export default carSlice.reducer;
