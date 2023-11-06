import { Route, Routes } from 'react-router-dom';
import Decoded from './decoded/Decoded';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Decoded />} />
      <Route path="/home" element={<h1>Home</h1>} />
    </Routes>
  );
}

export default Router;
