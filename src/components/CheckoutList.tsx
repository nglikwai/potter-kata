import { FC } from 'react';
import { useBasket } from '../providers/BasketProvider';
import CheckoutItem from './CheckoutItem';

const CheckoutList: FC = () => {
  const { basket, getTotalPrice, discounts } = useBasket();
  return (
    <div className="flex flex-col gap-10 ">
      <h1>Checkout</h1>
      <ul className="grid gap-4">
        {basket.map((item) => (
          <CheckoutItem key={item.book.title} item={item} />
        ))}
      </ul>
      <ul className="grid gap-2 text-start">
        {discounts.map((discount) => (
          <span key={discount.name}>{discount.name}</span>
        ))}
      </ul>
      <div className="flex gap-4 text-2xl font-bold">
        <span>Total</span>
        <span>€</span>
        {getTotalPrice()}
      </div>
    </div>
  );
};

export default CheckoutList;
