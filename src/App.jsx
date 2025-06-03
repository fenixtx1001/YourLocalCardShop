<style>
  {`body { background: lime; }`}
</style>

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import PackOpener from './pages/PackOpener';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/packopener" element={<PackOpener />} />
    </Routes>
  );
}
