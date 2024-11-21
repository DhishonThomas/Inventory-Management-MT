import React, { ReactNode, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

interface DashBoardLayoutProps {
  menuItems: { label: string; path: string; icon: React.ReactNode }[];
  children: ReactNode;
  bgColor?: string;
}

const DashBoard: React.FC<DashBoardLayoutProps> = ({ menuItems, children, bgColor }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [scrollY,setScrollY]=useState(false)

const location:any=useLocation()



useEffect(()=>{
  if(location.pathname.endsWith("dashboard")||location.pathname.endsWith("home")){
    setScrollY(true)
  }else{
    setScrollY(false)
  }
},[location])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen pt-20 relative">
      <SideBar menuItems={menuItems} bgColor={bgColor} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 ${scrollY?"overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700":"overflow-y-hidden"} p-4 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-24"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashBoard;
