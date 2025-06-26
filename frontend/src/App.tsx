import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/Pages/Home";
import LoginPage from "./app/Pages/login-page";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;