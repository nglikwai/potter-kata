import { FC } from 'react';
import { useBasket } from '../providers/BasketProvider';
import CheckoutDiscountList from './CheckoutDiscountList';
import CheckoutItemList from './CheckoutItemList';

const CheckoutList: FC = () => {
  const { getTotalPrice } = useBasket();
  return (
    <div className="flex flex-col gap-10 ">
      <h1>Checkout</h1>
      <CheckoutItemList />
      <CheckoutDiscountList />
      <div className="flex gap-4 text-2xl font-bold">
        <span>Total</span>
        <span>€</span>
        {getTotalPrice()}
      </div>
    </div>
  );
};

export default CheckoutList;
