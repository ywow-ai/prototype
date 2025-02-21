import { FC, useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router";
import Layout from "./Layout";
import Xx from "./Xx";
import Login from "./auth/Login";
import { Provider, useSelector } from "react-redux";
import { store, type StoreT } from "../utils/store";
import { useTokenMutation } from "../utils/auth/auth-hook";
import Loading from "./Loading";

const routes: (RouteObject & { module?: ModuleT })[] = [
  { path: "/", element: <Xx path="/" />, module: "Apotek" },
  {
    path: "/categories",
    element: <Xx path="categories" />,
  },
  {
    path: "/product-add",
    element: <Xx path="product-add" />,
  },
  {
    path: "/products",
    element: <Xx path="products" />,
  },
  {
    path: "/products/product-list",
    element: <Xx path="products/product-list" />,
  },
  {
    path: "/products/product-grid",
    element: <Xx path="products/product-grid" />,
  },
  {
    path: "/transactions",
    element: <Xx path="transactions" />,
  },
  {
    path: "/transactions/transaction-list",
    element: <Xx path="transactions/transaction-list" />,
  },
  {
    path: "/transactions/transaction-details",
    element: <Xx path="transactions/transaction-details" />,
  },
  {
    path: "/sellers",
    element: <Xx path="sellers" />,
  },
  {
    path: "/sellers/seller-list",
    element: <Xx path="sellers/seller-list" />,
  },
  {
    path: "/sellers/seller-details",
    element: <Xx path="sellers/seller-details" />,
  },
  {
    path: "/reviews",
    element: <Xx path="reviews" />,
  },
];

const Blocker: FC = () => {
  const navigate = useNavigate();
  const [token] = useTokenMutation();
  const isLoading = useSelector(
    ({ "app-slice": { isLoading } }: StoreT) => isLoading
  );
  const { pathname } = useLocation();

  const validate = async () => {
    try {
      const response = await token();
      if (response.error) {
        navigate("/login");
      } else {
        if (pathname === "/login") {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    return () => {
      validate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {isLoading && <Loading />}
      <Outlet />
    </>
  );
};

const Routes: FC = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Blocker />,
          children: [
            {
              path: "/",
              element: <Layout />,
              children: routes,
            },
            { path: "/login", element: <Login /> },
            { path: "*", element: <div>404 Not Found</div> },
          ],
        },
      ])}
    />
  );
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
