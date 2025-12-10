// Fichero src/components/App.jsx
import "../styles/App.scss";

import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import Hero from "./Layout/Hero.jsx";
import Preview from "./Create/Preview.jsx";
import Form from "./Create/Form.jsx";
import { Routes, Route } from "react-router";
import LandingPages from "./Layout/LandingPages.jsx";
import CreateProjects from "./Layout/CreateProjects.jsx";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPages/>} />
        <Route path="/create" element={<CreateProjects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
