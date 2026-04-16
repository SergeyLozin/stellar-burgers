// src/components/order-info/order-info.tsx
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import {
  fetchOrderByNumber,
  clearOrderDetails
} from '../../services/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const { order, isLoading, error } = useSelector(
    (state) => state.orderDetails
  );
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, number]);

  // Если заказ загружается
  if (isLoading) {
    return <Preloader />;
  }

  // Если ошибка или нет заказа
  if (error || !order) {
    return (
      <div className='text text_type_main-medium pt-10 text-center'>
        {error || 'Заказ не найден'}
      </div>
    );
  }

  // Готовим данные для отображения
  type TIngredientsWithCount = {
    [key: string]: {
      _id: string;
      name: string;
      type: string;
      proteins: number;
      fat: number;
      carbohydrates: number;
      calories: number;
      price: number;
      image: string;
      image_large: string;
      image_mobile: string;
      count: number;
    };
  };

  const ingredientsInfo = order.ingredients.reduce(
    (acc: TIngredientsWithCount, item: string) => {
      if (!acc[item]) {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: 1
          };
        }
      } else {
        acc[item].count++;
      }
      return acc;
    },
    {}
  );

  const total = Object.values(ingredientsInfo).reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const orderInfo = {
    ...order,
    ingredientsInfo,
    date: new Date(order.createdAt),
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
