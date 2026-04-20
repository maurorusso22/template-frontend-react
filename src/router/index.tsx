import { createBrowserRouter } from "react-router";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home/Home";
import Items from "@/pages/Items/Items";
import NotFound from "@/pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/items", element: <Items /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
