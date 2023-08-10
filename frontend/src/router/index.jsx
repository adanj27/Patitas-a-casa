import { Route, Routes } from "react-router-dom";

import { lazy } from "react";

import { FullWithLayout } from "../hocs/layouts/FullWithLayout";

const Home = lazy(() => import("../containers/pages/Home"))
const Perdidos = lazy(() => import("../containers/pages/Perdidos"))
const Encontrados = lazy(() => import("../containers/pages/Encontrados"))
const Adoptar = lazy(() => import("../containers/pages/Adoptar"))
const Blog = lazy(() => import("../containers/pages/Blog"))
const Blogs = lazy(() => import("../containers/pages/Blogs"))
const Refugios = lazy(() => import("../containers/pages/Refugios"))
const InformacionRefugio = lazy(() => import("../containers/pages/Refugios/components/InformacionRefugio"))
const Nosotros = lazy(() => import("../containers/pages/Nosotros"))
const Contacto = lazy(() => import("../containers/pages/Contacto"))
const Terminos = lazy(() => import("../containers/pages/Terminos"))
const NotFound = lazy(() => import("../containers/errors/NotFound"))

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <FullWithLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "adoptar",
//         element: <Adoptar />
//       },
//       {
//         path: "blog",
//         element: <Blog />
//       },
//       {
//         path: "blogs/:id",
//         element: <Blogs />
//       },
//       {
//         path: "nosotros",
//         element: <Nosotros />
//       },
//       {
//         path: "contacto",
//         element: <Contacto />
//       },
//       {
//         path: "perdidos",
//         element: <Perdidos />
//       },
//       {
//         path: "refugios",
//         element: <Refugios />
//       },
//       {
//         path: "refugios/informacion/:id",
//         element: <InformacionRefugio />
//       },
//       {
//         path: "encontrados",
//         element: <Encontrados />
//       }, 
//       {
//         path: "terminos-y-condiciones",
//         element: <Terminos />
//       },
//       {
//         path: "*",
//         element: <NotFound />
//       }
//     ],
//   },
// ]);

const AppRouter = () => {
  return (
    <Routes scrollRestoration="manual">
      <Route path="/" element={<FullWithLayout />}>
        <Route index element={<Home />} />
        <Route path="adoptar" element={<Adoptar />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blogs/:id" element={<Blogs />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="perdidos" element={<Perdidos />} />
        <Route path="refugios" element={<Refugios />} />
        <Route path="refugios/informacion/:id" element={<InformacionRefugio />} />
        <Route path="encontrados" element={<Encontrados />} />
        <Route path="terminos-y-condiciones" element={<Terminos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
