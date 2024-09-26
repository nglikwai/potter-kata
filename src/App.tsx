import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RootProvider from "./providers/RootProvider";
import BookList from "./components/BookList";
import CheckoutList from "./components/CheckoutList";

function App() {
  return (
    <div className="App">
      <RootProvider>
        <div className="flex gap-20 ">
          <BookList />
          <CheckoutList />
        </div>
      </RootProvider>
    </div>
  );
}

export default App;
