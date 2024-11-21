import React from 'react'
import Header from './Header'
import { MdDashboard ,MdInventory} from 'react-icons/md'
import { ImUsers } from "react-icons/im";
import DashBoard from '../components/ui/DashBoard';
import { Outlet } from 'react-router-dom';
const User = () => {

    const menuItems=[
        {label:'Dashboard',path:'/admin/dashboard',icon:<MdDashboard/>},
        {label:'Customers',path:'/admin/companies',icon:<ImUsers/>},
        {label:'Inventory',path:'/admin/payments',icon:<MdInventory/>}
      ] 

  return (
<>
<Header/>

<DashBoard menuItems={menuItems}>

<Outlet/>

</DashBoard>

</>
)
}

export default User