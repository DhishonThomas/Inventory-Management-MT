import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/userSlice";
import INVENTORY_LOGO from '../assets/inventory.png'
import Button from "../components/ui/Button";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
const dispatch=useDispatch()
const navigate=useNavigate()


  const handleSubmit=()=>{
dispatch(logout())
navigate("/")
  }

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-indigo-900 shadow-md">
      <div className="flex items-center justify-between px-10 ">
        <div>
          <img
            className="w-52 rounded-lg"
            src={INVENTORY_LOGO}
            alt="inventory logo"
          />
        </div>
        {user.user && (
          <div className="flex items-center justify-end pr-10">
            <Button

              bgColor={"bg-gray-800"}
              text="Logout"
              onclick={handleSubmit}
              type="button"
            />
          </div>
        )}
      </div>

      <hr />
    </header>
  );
};

export default Header;
