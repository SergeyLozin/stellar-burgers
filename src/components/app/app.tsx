// src/components/app/app.tsx
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '@slices/ingredientsSlice';
import { getUser } from '@slices/authSlice';

import { AppHeader } from '../app-header/app-header';
import { Modal } from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Preloader } from '@ui'; // 👈 Импортируем прелоадер

import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
import { Feed } from '../../pages/feed/feed';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders'; // 👈 Импортируем ProfileOrders
import { NotFound404 } from '../../pages/not-found-404/not-found-404';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderInfo } from '../order-info/order-info';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Проверяем авторизацию при старте
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Берём состояние загрузки ингредиентов из Redux
  const { isLoading: isIngredientsLoading } = useSelector((state) => state.ingredients);

  // Загружаем ингредиенты при первом рендере
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const background = location.state && (location.state as { background: Location }).background;

  return (
    <div className={styles.app}>
      <AppHeader />
      
      {/* Основные маршруты */}
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        
        <Route path="/login" element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
        
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* 👇 Исправлено: рендерим ProfileOrders, если ингредиенты загрузились */}
        <Route path="/profile/orders" element={
          <ProtectedRoute>
            {isIngredientsLoading ? <Preloader /> : <ProfileOrders />}
          </ProtectedRoute>
        } />
        
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/profile/orders/:number" element={<ProtectedRoute><OrderInfo /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Модалки - рендерятся поверх, если есть background в state */}
      {background && (
        <Routes>
          <Route path="/feed/:number" element={
            <Modal title="" onClose={() => navigate(-1)}><OrderInfo /></Modal>
          } />
          <Route path="/ingredients/:id" element={
            <Modal title="Детали ингредиента" onClose={() => navigate(-1)}><IngredientDetails /></Modal>
          } />
          <Route path="/profile/orders/:number" element={
            <Modal title="" onClose={() => navigate(-1)}><OrderInfo /></Modal>
          } />
        </Routes>
      )}
    </div>
  );
};

export default App;