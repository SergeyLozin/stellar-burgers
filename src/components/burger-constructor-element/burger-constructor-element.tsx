// src/components/burger-constructor-element/burger-constructor-element.tsx
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, onRemove }) => { // 👈 Принимаем onRemove
    const handleMoveDown = () => {};
    const handleMoveUp = () => {};

    // 👇 Реализуем удаление
    const handleClose = () => {
      if (onRemove) {
        onRemove(ingredient.id);
      }
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose} // 👈 Передаём реализованный обработчик
        onRemove={onRemove} // 👈 На всякий случай передаём и напрямую
      />
    );
  }
);