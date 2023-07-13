import { Outlet, useLocation } from "react-router-dom"
import Footer from "../../components/Footer"
import  { Navbar } from "../../components/Nav"
import { useEffect } from "react";

export const FullWithLayout = () => {
  const location = useLocation();

  // Alternativa más corta a <ScrollToTop />
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <div className="frente">
        <Navbar />
      </div>
        <Outlet />
      <Footer />
    </div>
  )
}
