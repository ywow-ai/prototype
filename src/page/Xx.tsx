import { FC } from "react";
import { useOutletContext } from "react-router";

const Xx: FC<{ path: string }> = ({ path }) => {
  const context = useOutletContext();
  return (
    <>
      <p>{path}</p>
      <p>{JSON.stringify(context)}</p>
    </>
  );
};

export default Xx;
