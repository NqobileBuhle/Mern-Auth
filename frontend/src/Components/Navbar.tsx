import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import axios from "axios";
import { IoPersonOutline } from "react-icons/io5";
import AddCar from "../Components/AddCar";
import { IoIosAdd } from "react-icons/io";

interface User {
  _id: string;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  // Fetch the user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get<User>("/api/users/profile", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null); // Ensure no user is set if the fetch fails
      }
    };
    fetchUserProfile();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/"); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle Edit Profile
  const handleEditProfile = () => {
    navigate("/profile"); // Redirect to the edit profile page
  };

  // Handle Delete Profile
  // const handleDeleteProfile = async () => {
  //   try {
  //     await axios.delete("/api/users/profile", { withCredentials: true });
  //     setUser(null);
  //     navigate("/"); // Redirect to home or login page after profile deletion
  //   } catch (error) {
  //     console.error("Error deleting profile:", error);
  //   }
  // };

  return (
    <nav className="bg-slate-700 text-blue-500">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            MERN Auth
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-36">
          <li>
            <Link to="/AddCar" className="hover:text-blue-400">
            <IoIosAdd  className="text-blue-500 size-4"/>
              Add
            </Link>
          </li>

          {user ? (
            <>
              {/* Profile and Dropdown Menu */}
              <div className="flex items-center space-x-2 ">
              <IoPersonOutline className="text-white" />
                <button
                  onClick={toggleDropdown}
                  className="text-blue-500 hover:text-blue-400 focus:outline-none"
                >
                  {user.name}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={handleEditProfile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 w-full text-left"
                        >
                           Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 w-full text-left"
                        >
                          Logout
                        </button>
                      </li>
                      {/* <li>
                        <button
                          onClick={handleDeleteProfile}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                        >
                          Delete Profile
                        </button>
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Links for non-logged in users */}
              <li>
                <Link to="/login" className="hover:text-blue-400">
                <FaSignInAlt />
                  SignIn
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400">
                <FaSignOutAlt />
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logout link always visible */}
        {user && (
          <ul className="md:hidden space-x-6">
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-purple-400 focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {/* Hamburger Menu (For Mobile) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
