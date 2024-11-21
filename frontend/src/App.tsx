import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar'; // Import your Navbar component
import EditCar from './Components/EditCar';
import AddCar from './Components/AddCar';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars/edit/:id" element={<EditCar />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/cars/edit/:id" element={<EditCar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
