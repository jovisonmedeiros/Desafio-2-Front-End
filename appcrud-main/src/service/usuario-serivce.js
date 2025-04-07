import service from "./service";
function Autenticar (email, senha){
    return new Promise((resolve,reject) => {
        service.post('/login', {email, senha})
        .then(response => resolve(response))
        .catch(erro => reject(erro))

    })
}

function salvarToken(token){
    localStorage.setItem('token', token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
}
function salvarServices(service){
    localStorage.setItem('produtos', JSON.stringify(service));
    
}

function obterToken(){
    return localStorage.getItem("token");  
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}";   
}

function sairSistema(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin(){
    window.open('/login', '_self');
}

function usuarioEstaLogado(){
    let token = obterToken();

    return !!token;
}

function validarUsuarioAutenticado(){

    let logado = usuarioEstaLogado();

    
    if(window.location.pathname === "/login"){
        
        if(logado){
            window.open("/clientes", '_self')
        }
    } else if(!logado && window.location.pathname !== "/login"){
        direcionarTelaDeLogin();
    }

}


validarUsuarioAutenticado();
export default {
    Autenticar,
    salvarToken,
    salvarUsuario,
    salvarServices,
    obterToken,
    obterUsuario,
    sairSistema,
    direcionarTelaDeLogin,
    usuarioEstaLogado,
    

}