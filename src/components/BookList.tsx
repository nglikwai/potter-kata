import { useBook } from '../hooks';
import BookCard from './BookCard';

const BookList = () => {
  const { books } = useBook();

  return (
    <div className="flex flex-col gap-10">
      <h1>Book List</h1>
      <ul className="grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-5">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
