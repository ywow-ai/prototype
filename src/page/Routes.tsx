import { FC, lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import Loading from "./Loading";

// const raw: RouteObject[] = [
//   { path: "/", element: import("./Xx") },
//   { path: "/categories" },
//   { path: "/product-add" },
//   { path: "/products" },
//   { path: "/products/product-list" },
//   { path: "/products/product-grid" },
//   { path: "/transactions" },
//   { path: "/transactions/transaction-list" },
//   { path: "/transactions/transaction-details" },
//   { path: "/sellers" },
//   { path: "/sellers/seller-list" },
//   { path: "/sellers/seller-details" },
//   { path: "/reviews" },
// ];

const Xx = lazy(() => import("./Dummy"));

const Routes: FC = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <Xx />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <p>404</p>,
        },
      ])}
    />
  );
};

export default Routes;
