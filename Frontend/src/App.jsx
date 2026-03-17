import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/index.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Upload from "./pages/upload.jsx";
import Campaign from "./pages/campaigns.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;