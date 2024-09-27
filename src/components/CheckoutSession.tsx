import { FC } from 'react';
import { useBasket } from '../providers/BasketProvider';
import CheckoutDiscountList from './CheckoutDiscountList';
import CheckoutItemList from './CheckoutItemList';
import { Button } from 'baseui/button';

const CheckoutList: FC = () => {
  const { getTotalPrice, clear } = useBasket();

  const totalPrice = getTotalPrice();
  return (
    <div className="flex flex-col gap-10 bg-gray-100 p-10 rounded-3xl">
      <h1>Checkout</h1>
      <CheckoutItemList />
      <CheckoutDiscountList />
      <div className="flex gap-4 text-2xl font-black grow">
        <span>Total</span>
        <span>€</span>
        {totalPrice}
      </div>
      {+totalPrice > 0 && <Button onClick={clear}>Clear</Button>}
    </div>
  );
};

export default CheckoutList;
