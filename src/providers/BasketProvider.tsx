import { createContext, FC, useContext, useEffect, useState } from 'react';
import { BasketType } from '../types/basket.type';
import { DiscountType } from '../types/discount.type';
import { calculateDiscountInGreedy } from '../utils/calculateDiscount';
import { discountMap } from '../constants/discount.constant';

type props = {
  children: React.ReactNode;
};

type BasketContextType = {
  basket: BasketType[];
  setBasket: (basket: BasketType[]) => void;
  addToBasket: (book: BasketType) => void;
  getTotalPrice: () => string;
  discounts: DiscountType[];
  reset: boolean;
  clear: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BasketProvider: FC<props> = ({ children }) => {
  const [basket, setBasket] = useState<BasketType[]>([]);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const discountSets = calculateDiscountInGreedy(basket.map((item) => item.quantity)).sets;
    const map: { [key: number]: number } = {};

    discountSets
      .filter((i) => i.length > 1)
      .forEach((set) => {
        map[set.length] = (map[set.length] || 0) + 1;
      });

    setDiscounts(
      Object.entries(map).map(([key, value]) => ({
        name: `Set of ${key} - ${discountMap[+key as keyof typeof discountMap] * 100}%off`,
        count: value,
      }))
    );
  }, [basket]);

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
  };

  const clear = () => {
    setReset((prev) => !prev);
    setBasket([]);
  };

  const getTotalPrice = () => {
    const sets = basket.map((item) => item.quantity);
    if (sets.length === 0) return '0';

    return calculateDiscountInGreedy(sets).totalPrice;
  };

  return (
    <BasketContext.Provider value={{ basket, setBasket, addToBasket, getTotalPrice, discounts, clear, reset }}>
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
