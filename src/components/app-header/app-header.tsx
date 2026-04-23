// src/components/app-header/app-header.tsx
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
