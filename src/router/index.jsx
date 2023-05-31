import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "../containers/errors";
import { Adoptar, Blog, Blogs, Contacto, Encontrados, Home, Perdidos, Refugios } from "../containers/pages";
import { FullWithLayout } from "../hocs/layouts/FullWithLayout";

export const router = createBrowserRouter([
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
        path: "perdidos",
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
