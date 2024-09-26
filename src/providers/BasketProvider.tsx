import { createContext, FC, useContext, useState } from 'react';
import { BookType } from '../types/book.type';
import { BasketType } from '../types/basket.type';
import { DiscountType } from '../types/discount.type';
import { discountMap } from '../constants/discount.constant';
import { calculateDiscountInGreedy } from '../utils/calculateDiscount';

type props = {
  children: React.ReactNode;
};

type BasketContextType = {
  basket: BasketType[];
  setBasket: (basket: BasketType[]) => void;
  addToBasket: (book: BasketType) => void;
  getTotalPrice: () => string;
  discounts: DiscountType[];
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BasketProvider: FC<props> = ({ children }) => {
  const [basket, setBasket] = useState<BasketType[]>([]);

  const [discounts, setDiscounts] = useState<DiscountType[]>([]);

  const addToBasket = (order: BasketType) => {
    if (order.quantity === 0) {
      setBasket(basket.filter((item) => item.book.title !== order.book.title));
    } else {
      const newBasket = [...basket];
      const index = newBasket.findIndex((item) => item.book.title === order.book.title);
      if (index === -1) {
        newBasket.push(order);
      } else {
        newBasket[index] = order;
      }
      setBasket(newBasket);
    }

    const discountSets = calculateDiscountInGreedy(basket.map((item) => item.quantity)).sets;

    setDiscounts(
      discountSets.map((set) => {
        const discount = 1 - (discountMap[set.length as keyof typeof discountMap] || 0);
        return {
          name: `Set of ${set.length}`,
          discount: discount,
          price: set.length * 8 * discount,
        };
      })
    );
  };

  const getTotalPrice = () => {
    const sets = basket.map((item) => item.quantity);
    if (sets.length === 0) return '0';

    return calculateDiscountInGreedy(sets).totalPrice;
  };

  return (
    <BasketContext.Provider value={{ basket, setBasket, addToBasket, getTotalPrice, discounts }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
