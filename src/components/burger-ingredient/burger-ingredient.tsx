import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';
import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      const uniqueId = `${ingredient._id}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      dispatch(addIngredient({ ...ingredient, id: uniqueId }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        handleAdd={handleAdd}
        locationState={{ background: location }}
      />
    );
  }
);
