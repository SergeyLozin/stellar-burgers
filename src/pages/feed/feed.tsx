// src/pages/feed/feed.tsx
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error, total, totalToday } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (error) {
    return (
      <div className='text text_type_main-medium pt-10 text-center'>
        Ошибка: {error}
        <button onClick={handleGetFeeds} className='button button_primary mt-4'>
          Попробовать снова
        </button>
      </div>
    );
  }

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      total={total}
      totalToday={totalToday}
      handleGetFeeds={handleGetFeeds}
    />
  );
};
