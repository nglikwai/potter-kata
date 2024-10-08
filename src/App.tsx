import './App.css';
import RootProvider from './providers/RootProvider';
import BookList from './components/BookList';
import CheckoutList from './components/CheckoutSession';

function App() {
  return (
    <div className="App">
      <RootProvider>
        <div className="flex gap-20 flex-col md:flex-row">
          <BookList />
          <CheckoutList />
        </div>
      </RootProvider>
    </div>
  );
}

export default App;
