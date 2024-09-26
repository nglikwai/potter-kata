import { useBasket } from '../providers/BasketProvider';
import CheckoutItem from './CheckoutItem';

const CheckoutItemList = () => {
  const { basket } = useBasket();

  return (
    <ul className="grid gap-4">
      {basket.map((item) => (
        <CheckoutItem key={item.book.title} item={item} />
      ))}
    </ul>
  );
};

export default CheckoutItemList;
