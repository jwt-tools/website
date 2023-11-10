import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { addCommonKeysEndpointsToStorage, loadAllKeys } from './lib/keys';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    (async () => {
      await addCommonKeysEndpointsToStorage();
      await loadAllKeys();
    })();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
