import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-purple-700 text-pink-500">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            MERN Auth
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-gray-200">
              Logout
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-gray-200">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-200 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

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
