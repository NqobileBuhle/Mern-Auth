import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../src/carSlice';

const store = configureStore({
  reducer: {
    cars: carReducer, // Register the car slice reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

