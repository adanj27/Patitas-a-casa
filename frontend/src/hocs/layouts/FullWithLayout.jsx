import { Outlet, useLocation } from "react-router-dom"
import Footer from "../../components/Footer"
import  { Navbar } from "../../components/Nav"
import ScrollToTop from "../../helpers/scrollToTop/scrollToTop";

export const FullWithLayout = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <div className="frente">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}
