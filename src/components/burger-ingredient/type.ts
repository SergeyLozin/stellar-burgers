// src/components/burger-ingredient/type.ts
import { TIngredient } from '@utils-types';
import { Location } from 'react-router-dom';

export type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count?: number;
};
