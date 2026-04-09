// src/components/order-info/order-info.tsx
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom'; // 👈 Читаем номер из URL
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>(); // Получаем number из URL
  const orders = useSelector((state) => state.feed.orders);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  // Ищем заказ в массиве заказов из стора
  const orderData: TOrder | undefined = useMemo(() => {
    return orders.find((order) => order.number.toString() === number);
  }, [orders, number]);

  // Готовим данные для отображения (состав заказа)
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

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

    const ingredientsInfo = orderData.ingredients.reduce(
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

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};