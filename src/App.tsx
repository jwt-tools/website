import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './layout/header/Header';
import { loadKeys } from './scripts/tokens';

function App() {
  loadKeys('https://www.googleapis.com/oauth2/v3/certs');
  
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
