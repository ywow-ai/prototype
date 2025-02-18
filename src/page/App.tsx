import { FC } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  // useBlocker,
} from "react-router";
import Layout from "./Layout";
import Xx from "./Xx";
import Login from "./auth/Login";
// import { Navigate } from "react-router";
import { Provider } from "react-redux";
import { authStore } from "../utils/auth/auth-store";

const Main: FC = () => {
  // useBlocker(({ nextLocation }) => {
  //   console.log(nextLocation);
  //   return true;
  // });

  // const login = false;

  // if (!login) {
  //   return <Navigate to="/login" />;
  // } else {
  // }
  return <Outlet />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <Xx path="/" /> },
          { path: "/categories", element: <Xx path="categories" /> },
          { path: "/product-add", element: <Xx path="product-add" /> },
          { path: "/products", element: <Xx path="products" /> },
          {
            path: "/products/product-list",
            element: <Xx path="products/product-list" />,
          },
          {
            path: "/products/product-grid",
            element: <Xx path="products/product-grid" />,
          },
          { path: "/transactions", element: <Xx path="transactions" /> },
          {
            path: "/transactions/transaction-list",
            element: <Xx path="transactions/transaction-list" />,
          },
          {
            path: "/transactions/transaction-details",
            element: <Xx path="transactions/transaction-details" />,
          },
          { path: "/sellers", element: <Xx path="sellers" /> },
          {
            path: "/sellers/seller-list",
            element: <Xx path="sellers/seller-list" />,
          },
          {
            path: "/sellers/seller-details",
            element: <Xx path="sellers/seller-details" />,
          },
          { path: "/reviews", element: <Xx path="reviews" /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

const App: FC = () => {
  return (
    <Provider store={authStore}>
      <RouterProvider router={routes} />
    </Provider>
  );
};

export default App;
