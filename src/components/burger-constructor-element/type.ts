// src/components/burger-constructor-element/type.ts
import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  onRemove?: (id: string) => void; // 👈 Добавили этот проп
};