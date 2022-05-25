import React from 'react';
import Logo from "../../assets/logo.png" 
import FormGroup from '../../components/FormGroup/FormGroup';

import "./LoginPage.css"

function LoginPage() {
  return (
    <div className='login-page-body'>
      <div className='login-box'>
        <div className='login-logo-container'>
            <img className="login-logo-image" src={Logo} alt="logo"/>
            {/*<div className='login-logo-subtitle'>Meninas ensinando meninas</div>*/}
        </div>
        <div className='login-form-box'>
          <div className="login-box-main-title">Bem vinda!</div>
          <div className="login-box-sub-title">Acesse sua conta</div>
          <div style={{width: "100%", marginTop: "10px"}}>
            <FormGroup
              type={'text'}
              size={'100'}
              label={"Email:"}
              placeholder={"Digite seu e-mail"}
              id={"email"}
            />
            <FormGroup
              type={'password'}
              size={'100'}
              label={"Senha:"}
              placeholder={"Digite sua senha"}
              id={"password"}
            />
            <div className="forgot-password-span">Esqueci minha senha</div>
            <button className="login-button" onClick={()=>{window.location.pathname = "dashboard"}}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;