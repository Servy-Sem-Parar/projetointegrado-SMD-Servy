import React, { useState } from 'react';
import Logo from "../../assets/logo.png" 
import FormGroup from '../../components/FormGroup/FormGroup';
import { closeLoader, openLoader } from '../../components/Loader/Loader';
import { makeConnection } from '../../Tools/makeConnection';

import "./LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  return (
    <div className='login-page-body'>
      <div className='login-box'>
        <div className='login-logo-container'>
            <img className="login-logo-image" src={Logo} alt="logo"/>
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
              validations={["mandatory"]}
              errorMessage={validations.email && validations.email}
              setFieldValidation={(field: string, value: string)=>{
                console.log(field, value)
                const newValidations = {...validations}
                newValidations[field] = value;
                setValidations(newValidations)
              }}
              onChange={(value)=>{
                setEmail(value as string)
              }}
            />
            <FormGroup
              type={'password'}
              size={'100'}
              label={"Senha:"}
              placeholder={"Digite sua senha"}
              id={"password"}
              validations={["mandatory"]}
              errorMessage={validations.password && validations.password}
              setFieldValidation={(field: string, value: string)=>{
                const newValidations = {...validations}
                newValidations[field] = value;
                setValidations(newValidations)
              }}
              onChange={(value)=>{
                setPassword(value as string)
              }}
            />
            <div className="forgot-password-span">Esqueci minha senha</div>
            <button 
              className="login-button" 
              onClick={async ()=>{
                openLoader();
                const user = await makeConnection({
                  method: "post",
                  suffix: "auth/login",
                  body: {
                    email,
                    password
                  }
                });
                closeLoader();
                console.log("user", user)
                //window.location.pathname = "dashboard";
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;