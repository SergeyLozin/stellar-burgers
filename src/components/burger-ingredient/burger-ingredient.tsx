// src/components/burger-ingredient/burger-ingredient.tsx
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';
import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(({ ingredient, count }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Получаем текущее состояние конструктора для подсчёта счётчика
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);

  let currentCount = count;
  if (ingredient.type === 'bun') {
    currentCount = bun ? 1 : 0;
  } else {
    currentCount = ingredients.filter(item => item._id === ingredient._id).length;
  }

  const handleAdd = () => {
    const uniqueId = `${ingredient._id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    dispatch(addIngredient({ ...ingredient, id: uniqueId }));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={currentCount}
      handleAdd={handleAdd}
      locationState={{ background: location }}
    />
  );
});