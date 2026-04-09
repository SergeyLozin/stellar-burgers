import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('resetPasswordStep')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPasswordStep');
        navigate('/login', { replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <ResetPasswordUI
      password={password}
      setPassword={setPassword}
      token={token}
      setToken={setToken}
      handleSubmit={handleSubmit}
      errorText="" 
    />
  );
};