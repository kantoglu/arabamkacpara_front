import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import TeklifAlPage from "./pages/TeklifAlPage";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teklifal" element={<TeklifAlPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
