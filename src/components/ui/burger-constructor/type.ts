// src/components/ui/burger-constructor/type.ts
import { TOrder, TConstructorIngredient } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  onRemoveIngredient?: (id: string) => void; // 👈 Добавили этот проп
};