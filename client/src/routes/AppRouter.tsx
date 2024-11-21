import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";

const AppRouter=()=>{

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter