import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
