import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChevronLeft } from "react-icons/fa";

interface SideBarProps {
  menuItems: { label: string; path: string; icon: React.ReactNode }[];
  bgColor?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ menuItems, bgColor = 'bg-stone-900', isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed left-0 h-full ${bgColor} text-white p-4 transition-all duration-300 ${isOpen ? "w-72" : "w-17"}`}>
      <div className={`flex ${isOpen?"justify-end":"justify-end"} items-center mb-6`}>
        <button onClick={toggleSidebar} className="text-3xl  focus:outline-none">
          {isOpen ? <FaChevronLeft /> : <FaBars />}
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <Link to={item.path}>
          <li key={index} className="flex items-center mb-6 p-2 rounded hover:bg-gray-700 transition-all duration-200">
            <Link
              to={item.path}
              className={`flex items-center text-base font-medium hover:text-blue-400 transition-colors duration-200 ${!isOpen && 'justify-center'}`}
            >
              <span className="mr-4 text-4xl">{item.icon}</span>
              {isOpen && item.label}
            </Link>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
