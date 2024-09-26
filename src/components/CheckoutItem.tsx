import { BasketType } from "../types/basket.type";

const CheckoutItem = ({ item }: { item: BasketType }) => {
  return (
    <li className="flex items-center justify-between">
      <h3>{item.book.title}</h3>
      <h4>{item.quantity}</h4>
    </li>
  );
};

export default CheckoutItem;
