// src/components/ui/pages/feed/feed.tsx
import { FC, memo } from 'react';
import styles from './feed.module.css';
import { FeedUIProps } from './type';
import { OrdersList } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds, total, totalToday }) => {
  // 👇 Считаем количество заказов по статусам
  // orders — это массив заказов, которые пришли с сервера
  const doneCount = orders.filter((order) => order.status === 'done').length;
  const pendingCount = orders.filter((order) => order.status === 'pending').length;

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text="Обновить"
          onClick={handleGetFeeds}
          extraClass="ml-30"
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} />
        </div>
        <div className={styles.columnInfo}>
          <div className="text text_type_main-medium">
            {/* 👇 Подставляем рассчитанные значения */}
            <p>Готовы: {doneCount}</p>
            <p>В работе: {pendingCount}</p>
            <p className="mt-15">Выполнено за все время: {total || 0}</p>
            <p>Выполнено за сегодня: {totalToday || 0}</p>
          </div>
        </div>
      </div>
    </main>
  );
});