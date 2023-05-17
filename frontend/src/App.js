import './App.css';

import Home from "./vistas/home.jsx"
import Perdidos from "./vistas/perdidos.jsx"
import Encontrados from './vistas/encontrados';
import Adoptar from "./vistas/adoptar.jsx"
import Blog from './vistas/blog';
import Blogs from './vistas/blogs';
import Contacto from './vistas/contacto';
import Refugios from "./vistas/refugios"
import NotFound from "./vistas/notFound.jsx"

import { Routes, Route } from 'react-router-dom';
import Nav from "./componentes/nav/nav";
import Footer from "./componentes/Footer/Footer";

//Routas de la app. Vincular las rutas con el componente nav
function App() {
  return (
		<div className="App">
				<div className="frente">
					<Nav />
				</div>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/perdidos" element={<Perdidos />} />
					<Route exact path="/encontrados" element={<Encontrados />} />
					<Route exact path="/adoptar" element={<Adoptar />} />
					<Route exact path="/blog" element={<Blog />} />
					<Route exact path={`/blogs/:id`} element={<Blogs />} />
					<Route exact path="/contacto" element={<Contacto />} />
					<Route exact path="/refugios" element={<Refugios />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
		</div>
	);
}

export default App;
