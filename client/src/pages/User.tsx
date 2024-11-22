import Header from './Header'
import { MdDashboard ,MdInventory} from 'react-icons/md'
import { ImUsers } from "react-icons/im";
import DashBoard from '../components/ui/DashBoard';
import { Outlet } from 'react-router-dom';
const User = () => {

    const menuItems=[
        {label:'Dashboard',path:'/dashboard',icon:<MdDashboard/>},
        {label:'Customers',path:'/customer',icon:<ImUsers/>},
        {label:'Inventory',path:'/inventory',icon:<MdInventory/>}
      ] 

  return (
<>
<Header/>

<DashBoard menuItems={menuItems} bgColor='bg-slate-600'>

<Outlet/>
</DashBoard>

</>
)
}

export default User