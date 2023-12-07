import Main from "../app/main";
import PageLayout from "../components/page-layout";
import Error from "../pages/error";
import ProductPage from "../pages/product-page";

export const routes = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];
