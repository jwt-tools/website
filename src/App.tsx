import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/header/Header';
import { createDatabase } from './storage/db';
import Footer from './layout/footer/Footer';

function App() {
  (async () => {
    await createDatabase();
  })();

  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
