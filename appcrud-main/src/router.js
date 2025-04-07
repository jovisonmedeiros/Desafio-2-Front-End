import Login from "./pages/login/login";
import PaginaCliente from "./pages/clientes";
import Menu from "./components/menu";

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProdutoPage from "./pages/produto";
function Router(){
    return(
        <BrowserRouter>
            <Menu/>
            <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/clientes" element={<PaginaCliente/>}/>
             <Route path="/produtos" element={<ProdutoPage/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default Router;