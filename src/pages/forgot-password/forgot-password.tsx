import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPasswordStep', 'success');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <ForgotPasswordUI
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      errorText=''
    />
  );
};
