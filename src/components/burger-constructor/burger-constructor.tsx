// src/components/burger-constructor/burger-constructor.tsx
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  sendOrder,
  closeOrderModal,
  removeIngredient
} from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients, orderRequest, orderModalData } = useSelector(
    (state) => state.burgerConstructor
  );

  // 👇 Берём данные пользователя из Redux
  const { user } = useSelector((state) => state.auth);

  const onOrderClick = () => {
    if (!bun || ingredients.length === 0) {
      alert('Добавьте булку и начинку для заказа');
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    const orderIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];
    dispatch(sendOrder(orderIds));
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
  };

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeIngredient(id));
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseModal}
      onRemoveIngredient={handleRemoveIngredient}
    />
  );
};
