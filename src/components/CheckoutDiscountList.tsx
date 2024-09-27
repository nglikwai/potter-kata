import { useBasket } from '../providers/BasketProvider';

const CheckoutDiscountList = () => {
  const { discounts } = useBasket();
  return (
    <ul className="grid gap-2 text-start md:w-60">
      {discounts.map((discount) => (
        <div key={discount.name} className="flex justify-between">
          <span>{discount.name}</span>
          <span>{discount.count}</span>
        </div>
      ))}
    </ul>
  );
};

export default CheckoutDiscountList;
