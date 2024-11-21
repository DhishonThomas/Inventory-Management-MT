import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Navigate } from "react-router-dom"

const Auth = () => {

    const user=useSelector((state:RootState)=>state.user)

    if(!user.isAuthenticated){
        return  <Navigate to={"/dashboard"} replace/>
       
    }

  return (
    <div className='text-yellow-700'>Auth</div>
  )

}

export default Auth