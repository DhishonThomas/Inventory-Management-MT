import Header from './Header'
import { MdDashboard ,MdInventory} from 'react-icons/md'
import { ImUsers } from "react-icons/im";
import DashBoard from '../components/ui/DashBoard';
import { Outlet } from 'react-router-dom';
import { FcSalesPerformance } from "react-icons/fc";
const User = () => {

    const menuItems=[
        {label:'Dashboard',path:'/dashboard',icon:<MdDashboard className='text-yellow-500'/>},
        {label:'Customers',path:'/customer',icon:<ImUsers className='text-yellow-500'/>},
        {label:'Inventory',path:'/inventory',icon:<MdInventory className='text-yellow-500'/>},
        {label:'Sales',path:'/sale',icon:<FcSalesPerformance/>}
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