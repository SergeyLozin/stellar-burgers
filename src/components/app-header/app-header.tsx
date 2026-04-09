// src/components/app-header/app-header.tsx
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from '../ui/app-header/app-header.module.css';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name || '';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.menu__link} ${styles.active}` : styles.menu__link
            }
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
          </NavLink>
          
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? `${styles.menu__link} ${styles.active}` : styles.menu__link
            }
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        
        <div className={styles.logo}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Logo className='' />
          </NavLink>
        </div>
        
        <div className={styles.link_position_last}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.menu__link} ${styles.active}` : styles.menu__link
            }
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};