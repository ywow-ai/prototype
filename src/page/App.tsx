import { FC, useEffect, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
  useBlocker,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router";
import Layout from "./Layout";
import Xx from "./Xx";
import Login from "./auth/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, type StoreT } from "../utils/store";
import { useTokenMutation } from "../utils/auth/auth-hook";
import Loading from "./Loading";
import { setIsLoading } from "../utils/app/app-slice";

const r: RouteObject[] = [];

const Main: FC = () => {
  const [token] = useTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoading = useSelector(
    ({ "app-slice": { isLoading } }: StoreT) => isLoading
  );
  // const permissions = useSelector(
  //   ({ "auth-slice": { permissions } }: StoreT) => permissions
  // );

  const validate = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await token();
      if (response.error) {
        navigate("/login");
      } else {
        if (pathname === "/login") {
          navigate("/");
        }
      }
    } catch {
      navigate("/login");
    } finally {
      dispatch(setIsLoading(false));
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

const W: FC = () => {
  const [block, setBlock] = useState<boolean>(true);

  useBlocker(block);

  setTimeout(() => {
    setBlock(false);
  }, 800);

  return <Outlet />;
};

const RP: FC = () => {
  const [permission, setPermission] = useState<PermissionT>({
    module: "Registrasi",
    can_create: false,
    can_delete: false,
    can_edit: false,
    can_view: false,
  });

  const routes = createBrowserRouter([
    {
      HydrateFallback: Loading,
      path: "/",
      element: <W />,
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

  routes.subscribe(({ location: { pathname }, blockers, navigation }) => {
    // blockers.forEach(({ proceed }) => {
    //   if (proceed) {
    //     proceed();
    //   }
    // });
  });

  return <RouterProvider router={routes} />;
};

const App: FC = () => {
  return (
    <Provider store={store}>
      <RP />
    </Provider>
  );
};

export default App;
