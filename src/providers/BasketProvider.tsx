import { createContext, FC, useContext, useState } from 'react';
import { BookType } from '../types/book.type';
import { BasketType } from '../types/basket.type';
import { DiscountType } from '../types/discount.type';
import { discountMap } from '../constants/discount.constant';

type props = {
  children: React.ReactNode;
};

type BasketContextType = {
  basket: BasketType[];
  setBasket: (basket: BasketType[]) => void;
  addToBasket: (book: BasketType) => void;
  getTotalPrice: () => number;
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

    const sorted = [...basket].sort((a, b) => b.quantity - a.quantity);

    const sets: BookType[][] = Array.from({ length: sorted[0]?.quantity }, () => []);

    sorted.forEach((item) => {
      let count = item.quantity;

      while (count > 0) {
        sets[count - 1].push(item.book);
        count--;
      }
    });

    const discount: DiscountType[] = [];

    sets.forEach((set) => {
      if (set.length > 1) {
        discount.push({
          name: `${set.length}x get ${discountMap[set.length as keyof typeof discountMap] * 100}% off`,
          discount:
            set.reduce((acc, book) => acc + book.price, 0) * discountMap[set.length as keyof typeof discountMap],
        });
      }
    });

    setDiscounts(discount);
  };

  const getTotalPrice = () => {
    return 0;
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
