// src/components/ui/burger-constructor-element/type.ts
import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementUIProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
  onRemove?: (id: string) => void; // 👈 Добавили этот проп
};