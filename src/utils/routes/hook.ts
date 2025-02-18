import { useEffect } from "react";
import { useLocation } from "react-router";

const useOnRouteChange = (callback: (pathname: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    callback(location.pathname);
  }, [location.pathname, callback]);
};

export { useOnRouteChange };
