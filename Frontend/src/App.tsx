import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CarPage from "./Cars/CarPage.tsx";
import RegistrationPage from "./Registrations/RegistrationPage.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Link to="/">Cars</Link>
        <Link to="/registration">Registration</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CarPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
