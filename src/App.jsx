import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import PackOpener from "./pages/PackOpener";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/packopener" element={<PackOpener />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
