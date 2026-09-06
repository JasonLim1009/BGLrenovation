import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader.jsx";
import TopBar from "./components/TopBar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Analytics from "./components/Analytics.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import AmbientMusic from "./components/AmbientMusic.jsx";
import Home from "./pages/Home.jsx";
import Service from "./pages/Service.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <Preloader />
      <TopBar />
      <Header />

      <main>
        <article>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </article>
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
      <AmbientMusic />
    </>
  );
}
