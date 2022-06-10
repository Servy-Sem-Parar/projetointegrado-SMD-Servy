import React, { useState } from 'react';
import Logo from "../../assets/logo.png" 
import { alertError } from '../../components/Alert/Alert';
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
          <form style={{width: "100%", marginTop: "10px"}} onSubmit={async (e)=>{
            e.preventDefault();
            openLoader();
            try {
              const response = await makeConnection({
                method: "post",
                suffix: "auth/login",
                body: {
                  email,
                  password
                }
              });
              if(response?.data.user.role === "student") {
                alertError("Alunas devem acessar a plataforma pelo aplicativo.")
              } else {
                localStorage.setItem("token", "Bearer " + response?.data.token);
                localStorage.setItem("user", JSON.stringify(response?.data.user));
                if(window.location.pathname === "/") {
                  window.location.pathname = "home";
                } else {
                  window.location.reload();
                }
              }
            } catch (err) {
              const error = err as {
                response: {
                  data: {
                    error: string
                  }
                }
              }
              alertError(error.response.data.error)
            }
            closeLoader();
          }}>
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
              type='submit'
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;