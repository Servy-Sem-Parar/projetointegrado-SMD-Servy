import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ApproveRegisters from "../pages/ApproveRegisters/ApproveRegisters";
import { ClassDetails } from "../pages/ClassDetails/ClassDetails";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage/LoginPage";
import Matters from "../pages/Matters/Matters";
import Planing from "../pages/Planing/Planing";
import Students from "../pages/Students/Students";
import Teachers from "../pages/Teachers/Teachers";

export function isAuth() {
    const user = localStorage.getItem("token");
    const token = localStorage.getItem("user");

    return token && user;
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="home" element={isAuth() ? <Home/> : <LoginPage/>}/>
                <Route path="professoras" element={isAuth() ? <Teachers/> : <LoginPage/>}/>
                <Route path="alunas" element={isAuth() ? <Students/> : <LoginPage/>}/>
                <Route path="turmas" element={isAuth() ? <Classes/> : <LoginPage/>}/>
                <Route path="planejamento" element={isAuth() ? <Planing/> : <LoginPage/>}/>
                <Route path="disciplinas" element={isAuth() ? <Matters/> : <LoginPage/>}/>
                <Route path="aprovar_cadastros" element={isAuth() ? <ApproveRegisters/> : <LoginPage/>} />
                <Route path="detalhes_da_turma/:id" element={isAuth() ? <ClassDetails/> : <LoginPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;