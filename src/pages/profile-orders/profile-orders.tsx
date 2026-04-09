// src/pages/profile-orders/profile-orders.tsx
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.profileOrders);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="text text_type_main-medium pt-10 text-center">
        Ошибка: {error}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text text_type_main-medium pt-10 text-center">
        У вас пока нет заказов
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};