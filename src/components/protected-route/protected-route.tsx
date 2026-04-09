// src/components/protected-route/protected-route.tsx
import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui'; // Или '../ui/preloader', если алиас не сработает

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const { isAuthChecked, user } = useSelector((state) => state.auth);

  // 1. Пока идёт проверка авторизации (запрос getUser в App), показываем загрузку
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // 2. Если страница только для ГОСТЕЙ (логин/регистрация), а пользователь уже вошёл
  if (onlyUnAuth && user) {
    // Берём путь, откуда пытались зайти, или ведём на главную
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  // 3. Если страница только для АВТОРИЗОВАННЫХ, а пользователь НЕ вошёл
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 4. Все проверки пройдены — рендерим содержимое роута
  return children;
};