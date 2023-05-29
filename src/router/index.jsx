import { createBrowserRouter } from "react-router-dom";

import { ScrollToTop } from "./ScrollToTop";
import { NotFound } from "../containers/errors";
import { Adoptar, Blog, Blogs, Contacto, Encontrados, Home, Perdidos, Refugios } from "../containers/pages";
import { FullWithLayout } from "../hocs/layouts/FullWithLayout";

export const router = createBrowserRouter([
  {
    element: <ScrollToTop />
  },
  {
    path: "/",
    element: <FullWithLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "adoptar",
        element: <Adoptar />
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "blogs/:id",
        element: <Blogs />
      },
      {
        path: "contacto",
        element: <Contacto />
      },
      {
        path: "pedidos",
        element: <Perdidos />
      },
      {
        path: "refugios",
        element: <Refugios />
      },
      {
        path: "encontrados",
        element: <Encontrados />
      } 
    ],
  },
]);
