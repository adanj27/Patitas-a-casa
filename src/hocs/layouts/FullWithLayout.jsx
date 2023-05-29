import { Outlet } from "react-router-dom"
import Footer from "../../components/Footer"
import  { Navbar } from "../../components/Nav"

export const FullWithLayout = () => {
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
