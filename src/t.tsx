/* eslint-disable no-nested-ternary */
import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  RouterProviderProps,
} from "react-router-dom";

import { useSelectorApp, useSelectorAuth } from "@src/helpers/vendor";
import { router } from "@src/routes";
import ErrorElement from "@src/views/others/ErrorElement";

import importElement from "./utils/importElement";
import Fallback from "./views/others/Fallback";

const App = importElement(() => import("@src/App"));
const Login = importElement(() => import("@src/views/auth/Login"));
const NotFound = importElement(() => import("@src/views/others/NotFound"));
const PortalLayout = importElement(() => import("@src/layouts/PortalLayout"));
const LoggedLayout = importElement(() => import("@src/layouts/LoggedLayout"));

const Router = () => {
  const { auth } = useSelectorApp();
  const { module, permissions, roles } = useSelectorAuth();

  const logged = auth && module;
  const routerWithLayout = router(module, permissions, roles);
  const routerStandAlone = router(module, permissions, roles, true);
  const routerStandAloneApp = router(module, permissions, roles, true, true);
  const standAlone = logged && routerStandAlone.length > 0;
  const standAloneApp = logged && routerStandAloneApp.length > 0;

  return (
    <RouterProvider
      router={createBrowserRouter(
        [
          ...(standAlone && Array.isArray(routerStandAlone)
            ? routerStandAlone
            : []),
          {
            path: "/",
            errorElement: <ErrorElement logged={!!logged} />,
            element: (
              <Suspense fallback={<Fallback fetching />}>
                <App />
              </Suspense>
            ),
            children: [
              {
                path: "/",
                element: (
                  <Suspense fallback={<Fallback />}>
                    {logged ? (
                      <LoggedLayout />
                    ) : auth ? (
                      <PortalLayout />
                    ) : (
                      <Login />
                    )}
                  </Suspense>
                ),
                children: [
                  ...(logged && Array.isArray(routerWithLayout)
                    ? routerWithLayout
                    : []),
                ],
              },
              ...(standAloneApp && Array.isArray(routerStandAloneApp)
                ? routerStandAloneApp
                : []),
              {
                path: "*",
                element: logged ? (
                  <Suspense fallback={<Fallback />}>
                    <NotFound />
                  </Suspense>
                ) : (
                  <Navigate to="/" replace />
                ),
              },
            ],
          },
        ],
        {
          future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
          },
        }
      )}
      future={
        {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        } as RouterProviderProps["future"]
      }
    />
  );
};

export default Router;
