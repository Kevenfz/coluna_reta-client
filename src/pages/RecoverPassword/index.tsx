import cr_logo from "./../../assets/icons/cr_logo.png";
import confirm_icon from "./../../assets/icons/confirm_icon.svg";
import "./style.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { registerPassword } from "../../types/types";
import { toast } from "react-toastify";
import { IoInformationCircleOutline } from "react-icons/io5";
import LoadingModal from "../../components/LoadingModal";

const RecoverPassword = () => {
 
  const [isInfoLoading,setIsInfoLoading] = useState<boolean>(false)

  const params = useParams();

  const navigate = useNavigate();

  const [regPassword, setRegPassword] = useState<registerPassword>({
    passwordHash: "",
    confirmPassword: "",
    recoverPasswordToken: params.token,
  });

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegPassword({
      ...regPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsInfoLoading(true)
    event.preventDefault();
    const response = await userService.registerPassword(regPassword);
   if(response.status != 200){
     toast.error(response.data.message[0],{
      className: 'toast-error--message'
     })
    }
    else{
      toast.success('Senha registrada com sucesso!')
      navigate('/')
    }
    setIsInfoLoading(false)
  };

  return (
    <main className="register-password--section">
      <section className="register-password-logo--section">
        <img
          className="register-cr--logo"
          src={cr_logo}
          alt="Logo roxo do site Coluna Reta"
        />
        <span className="register-cr-logo--span">Backoffice</span>
      </section>

      <section className="register-password-image-form--section">
        <div className="register-password-image-form--container">
          <div className="register-password-form--container register--container">
            <form onSubmit={handleSubmit} className="register-password--form">
              <h1 className="register-password--heading">
                {" "}
                REGISTRE SUA SENHA
              </h1>
              <div className="register-password-form-inputs--container">
                <div className="register-form-label-input--container">
                  <input
                    type="password"
                    name="passwordHash"
                    onChange={handleChanges}
                    className="register-password-form--input"
                    required
                  />
                  <label className="register-password-form--label">
                    Senha
                    <IoInformationCircleOutline className="password-label-info--icon" />
                    <div className="password-regex--info">
                      A senha deve ter no mínimo 8 caracteres, um número, uma
                      letra maiúscula, uma letra minúscula e um caracter
                      especial. Ex: Y7@kksb4
                    </div>
                  </label>
                </div>

                <div className="register-form-label-input--container">
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChanges}
                    className="register-password-form--input"
                    required
                    />
                  <label className="register-password-form--label">
                    Confirme sua senha
                    {regPassword.passwordHash != "" &&
                    regPassword.confirmPassword != "" &&
                    regPassword.passwordHash != regPassword.confirmPassword ? (
                      <span className="password-match">*Senhas não conferem*</span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
              </div>
              <div className="register-password-button--container">
                <button
                  disabled={
                    regPassword.passwordHash != "" &&
                    regPassword.confirmPassword != "" &&
                    regPassword.passwordHash != regPassword.confirmPassword
                      ? true
                      : false
                  }
                  className="register-password--button"
                >
                  ENVIAR
                </button>
              </div>
            </form>
          </div>
          <div className="register--divider"></div>
          <div className="register-password-image--container register--container">
            <img
              className="register-confirm--icon"
              src={confirm_icon}
              alt="Imagem com cores de paleta roxa de uma mulher segurando um celular confirmando sua senha"
            />
          </div>
        </div>
      </section>
      {isInfoLoading? <LoadingModal/> : ''}
    </main>
  );
};

export default RecoverPassword;
