import { useEffect, useState } from 'react';
import { BookType } from '../types/book.type';
import { Stepper } from 'baseui/stepper';
import { useBasket } from '../providers/BasketProvider';

const BookCard = ({ book }: { book: BookType }) => {
  const [value, setValue] = useState(0);

  const { addToBasket, reset, setReset } = useBasket();

  useEffect(() => {
    if (reset) {
      setValue(0);
    }
  }, [reset, setReset]);

  const onStepperClick = (newValue: number) => {
    setValue(newValue);
    addToBasket({ book, quantity: newValue });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ backgroundColor: book.coverColor }} className="w-full h-60 rounded-2xl p-4 max-w-44">
        <h2 className="text-white">{book.title}</h2>
      </div>
      <h3>{book.title}</h3>
      <h4 className="flex gap-1">
        <span>€</span>
        <span>{book.price}</span>
      </h4>
      <Stepper value={value} setValue={(newValue) => onStepperClick(newValue)} />
    </div>
  );
};

export default BookCard;
