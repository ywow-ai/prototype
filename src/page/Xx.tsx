import { useEffect } from "react";
import { useOutletContext } from "react-router";

const Xx: FX<{ path: string }> = ({ path }) => {
  const context = useOutletContext();

  useEffect(() => {
    console.log(context);
  }, [context]);

  return <p>{path}</p>;
};

export default Xx;
