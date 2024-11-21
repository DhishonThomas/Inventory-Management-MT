import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute:React.FC = () => {
  
const user=useSelector((state:RootState)=>state.user)  

if(!user || !user.isAuthenticated){
   return <Navigate to={"/"} replace/>
}

return <Outlet/>
}

export default PrivateRoute