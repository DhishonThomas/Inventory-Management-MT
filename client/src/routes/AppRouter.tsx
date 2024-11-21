import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Customer from "../pages/Customer";
import CustomerCreate from "../pages/CustomerCreate";
import Inventory from "../pages/Inventory";
import InventoryCreate from "../pages/InventoryCreate";

const AppRouter=()=>{

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/customer" element={<Customer/>}/>
            <Route path="/customer/create" element={<CustomerCreate />} />
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/inventory/create" element={<InventoryCreate/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter