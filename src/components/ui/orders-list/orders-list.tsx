import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => {
  console.log('🎴 OrdersListUI: рендерим', orderByDate.length, 'заказов');
  if (orderByDate.length > 0) {
    console.log('📦 Первый заказ для OrderCard:', orderByDate[0]);
  }

  return (
    <div className={`${styles.content}`}>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
};
