import { FC } from 'react';
import { useBasket } from '../providers/BasketProvider';
import CheckoutDiscountList from './CheckoutDiscountList';
import CheckoutItemList from './CheckoutItemList';
import { Button } from 'baseui/button';

const CheckoutList: FC = () => {
  const { getTotalPrice, clear, basket } = useBasket();

  const discountedPrice = +getTotalPrice();
  const originalPrice = basket.reduce((acc, o) => acc + o.quantity, 0) * 8;

  return (
    <div className="flex flex-col gap-10 bg-gray-100 p-10 rounded-3xl">
      <h1>Checkout</h1>
      <CheckoutItemList />
      <CheckoutDiscountList />
      <div className=" grow ">
        <p className="flex gap-4 text-2xl font-black items-center">
          <span>Total</span>
          <span>€</span>
          <span className="grow text-start">{discountedPrice}</span>
          {originalPrice > +discountedPrice && (
            <span className="text-base line-through font-normal">{originalPrice}</span>
          )}
        </p>
      </div>
      {+discountedPrice > 0 && <Button onClick={clear}>Clear</Button>}
    </div>
  );
};

export default CheckoutList;
