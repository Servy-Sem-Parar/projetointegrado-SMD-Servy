import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Classes from "../pages/Classes";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Planing from "../pages/Planing";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Tests from "../pages/Tests";

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
                <Route path="provas" element={<Tests/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;