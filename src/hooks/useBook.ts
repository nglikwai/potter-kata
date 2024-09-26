import { useState } from "react";
import { BookType } from "../types/book.type";

export const useBook = () => {
  const [books, setBooks] = useState<BookType[]>(booksData);
  return {
    books,
  };
};

const booksData: BookType[] = [
  { id: 1, title: "Harry Potter 1", price: 8, coverColor: "#8AA399" },
  { id: 2, title: "Harry Potter 2", price: 8, coverColor: "#7D84B2" },
  { id: 3, title: "Harry Potter 3", price: 8, coverColor: "#8FA6CB" },
  { id: 4, title: "Harry Potter 4", price: 8, coverColor: "#C18C5D" },
  { id: 5, title: "Harry Potter 5", price: 8, coverColor: "#495867" },
];
