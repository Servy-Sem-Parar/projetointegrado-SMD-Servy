import React, { FormEvent, useState } from 'react';
import Mulher from "../../assets/mulher.png" 
import { alertError } from '../../components/Alert/Alert';
import FormGroup from '../../components/FormGroup/FormGroup';
import { makeConnection } from '../../Tools/makeConnection';

import "./LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    } else if(response?.data.user) {
      localStorage.setItem("token", "Bearer " + response?.data.token);
      localStorage.setItem("user", JSON.stringify(response?.data.user));
      if(window.location.pathname === "/") {
        window.location.pathname = "home";
      } else {
        window.location.reload();
      }
    }
  }

  const renderForm = () => {
    return (
      <form style={{width: "100%", marginTop: "10px"}} onSubmit={onSubmit}>
            <FormGroup
              type={'text'}
              size={'100'}
              placeholder={"Email"}
              id={"email"}
              validations={["mandatory"]}
              errorMessage={validations.email && validations.email}
              setFieldValidation={(field: string, value: string)=>{
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
              placeholder={"Senha"}
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
    )
  }

  return (
    <div className='login-page-body'>
      <div className='login-first'>
        <div className='login-logo-holder'>
          <span className='login-logo-text-title'>
            Projeto
          </span>
          <span className='login-logo-text-subtitle'>
            Sem Parar
          </span>
        </div>
        <div className='login-mulher-container'>
          <img src={Mulher} alt="mulher"/>
        </div>
        <div className='wave'></div>
      </div>
      <div className='login-second'>
        <div className='login-wrapper'>
          <h1>
            Acesse sua conta
          </h1>
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;