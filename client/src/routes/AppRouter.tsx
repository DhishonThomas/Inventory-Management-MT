import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Customer from "../pages/Customer";
import CustomerCreate from "../pages/CustomerCreate";
import Inventory from "../pages/Inventory";
import InventoryCreate from "../pages/InventoryCreate";
import User from "../pages/User";
import Dashboard from "../pages/Dashboard";

const AppRouter=()=>{

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth/>} />

            <Route path="/" element={<User/>} >
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="customer" element={<Customer/>}/>
            <Route path="customer/create" element={<CustomerCreate />} />
            <Route path="inventory" element={<Inventory/>}/>
            <Route path="inventory/create" element={<InventoryCreate/>}/>
            </Route>

        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter