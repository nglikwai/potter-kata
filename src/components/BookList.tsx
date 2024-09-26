import { useState } from "react";
import { useBook } from "../hooks";
import BookCard from "./BookCard";

const BookList = () => {
  const { books } = useBook();

  return (
    <div className="flex flex-col gap-10">
      <h1>Book List</h1>
      <ul className="grid grid-cols-3 gap-10">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
