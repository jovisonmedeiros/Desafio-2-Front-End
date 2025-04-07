import React from 'react';
import { useState } from 'react';
import './login.css';
import Swal from 'sweetalert2'
import {

  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import usuarioSerivce from '../../service/usuario-serivce';



function Login() {

  const[email,setEmail] = useState('admin@admin.com');
  const[senha,setSenha] = useState('');

  const logar = () =>{
 
    if(!email || !senha){
        Swal.fire({
          icon: 'error',
          text:'Os campos de e-mail e senha são obrigatórios!'
        })
    
      return;}
      usuarioSerivce.Autenticar(email,senha)
      .then(response=>{
        console.log(response)
        usuarioSerivce.salvarToken(response.data.token)
        usuarioSerivce.salvarUsuario(response.data.usuario);
          window.location='/clientes'
      })
      .catch(error =>{
        console.log(error)
      })
  };
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className="text-black-100 mb-3">Entre com Login e Senha</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email ' id='formControlLg' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Senha' id='formControlLg' value={senha} onChange={(e) => setSenha(e.target.value)} type='password' size="lg"/>

             
              <button className='login-button' onClick={logar}>
                Login
              </button>

  
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;