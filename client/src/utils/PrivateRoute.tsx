import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, Route } from 'react-router-dom';
interface PrivateRouteProps{
    element:React.ReactNode;
    path?:string,
    exact?:string,
    strict?:string,
    [key:string]:any;
}
const PrivateRoute:React.FC<PrivateRouteProps> = ({element,...rest}) => {
  
const user=useSelector((state:RootState)=>state.user)  

if(!user || !user.isAuthenticated){
   return <Navigate to={"/"} replace/>
}

return <Route {...rest} element={element}/>
}

export default PrivateRoute