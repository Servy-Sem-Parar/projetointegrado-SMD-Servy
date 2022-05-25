import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage";
import Planing from "../pages/Planing/Planing";
import Students from "../pages/Students/Students";
import Teachers from "../pages/Teachers/Teachers";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="professoras" element={<Teachers/>}/>
                <Route path="alunas" element={<Students/>}/>
                <Route path="turmas" element={<Classes/>}/>
                <Route path="planejamento" element={<Planing/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;