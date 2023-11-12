import React, { useState } from 'react';
import { LoginForm } from './Login';
import { RegisterForm } from './Register';

export const AuthFormContainer = ({ setLogin }) => {
  const [isRegisterForm, setIsRegisterForm] = useState(true);

  const switchForm = () => {
    setIsRegisterForm((prevIsRegisterForm) => !prevIsRegisterForm);
  };

  const FormComponent = isRegisterForm ? RegisterForm : LoginForm;

  return (
    <FormComponent
      setLogin={setLogin}
      isRegisterForm={isRegisterForm}
      switchForm={switchForm}
    />
  );
};


