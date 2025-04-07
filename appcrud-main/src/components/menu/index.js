import usuarioSerivce from '../../service/usuario-serivce'
import './index.css'

import{Link, useLocation} from 'react-router-dom'


function Menu(){
    if(useLocation().pathname !== '/login'){
        const logout = ()=>{
            usuarioSerivce.sairSistema();
        }
        return(
            <ul className='menu'>
                <li><Link to='/clientes'>Clientes</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/login' onClick={logout}>Sair</Link></li>
            </ul>
        )
       
    }
     else{
            return null;
        }
}

export default Menu;