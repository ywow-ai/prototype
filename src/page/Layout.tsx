import { Fragment /*useEffect*/ } from "react";
// import { useSelector } from "react-redux";
import { NavLink, type NavLinkProps, Outlet, useLocation } from "react-router";
// import { StoreT } from "../utils/store";

type NavT = Omit<NavLinkProps, "children" | "to"> & {
  to: string;
  name: string;
  children?: NavT[];
};

const navs: NavT[] = [
  { to: "/", name: "Home" },
  { to: "/categories", name: "Categories" },
  { to: "/product-add", name: "Product Add" },
  {
    to: "/products",
    name: "Products",
    children: [
      { to: "/products/product-list", name: "Product List" },
      { to: "/products/product-grid", name: "Product Grid" },
    ],
  },
  {
    to: "/transactions",
    name: "Transactions",
    children: [
      { to: "/transactions/transaction-list", name: "Transaction List" },
      { to: "/transactions/transaction-details", name: "Transaction Details" },
    ],
  },
  {
    to: "/sellers",
    name: "Sellers",
    children: [
      { to: "/sellers/seller-list", name: "Seller List" },
      { to: "/sellers/seller-details", name: "Seller Details" },
    ],
  },
  { to: "/reviews", name: "Reviews" },
];

const Layout: FX = () => {
  const { pathname } = useLocation();
  // const permissions = useSelector(
  //   ({ "auth-slice": { permissions } }: StoreT) => permissions
  // );

  // useEffect(() => {
  //   console.log(pathname);
  // }, [pathname]);

  // useEffect(() => {
  //   return () => {
  //     console.log(permissions);
  //   };
  // }, [permissions]);

  return (
    <div className="flex">
      <aside className="w-1/7 pl-4">
        <ul>
          {navs.map((x, _x) => (
            <Fragment key={_x}>
              <li>
                <NavLink
                  to={x.to}
                  className={({ isActive }) =>
                    `${
                      isActive && pathname === x.to
                        ? "text-indigo-700 font-bold"
                        : isActive
                        ? "text-amber-500 font-bold"
                        : ""
                    }`
                  }
                >
                  {x.name}
                </NavLink>
              </li>
              {x.children && (
                <div className="pl-4">
                  <ul>
                    {x.children.map((y, _y) => (
                      <li key={_y}>
                        <NavLink
                          to={y.to}
                          className={({ isActive }) =>
                            `${isActive ? "text-indigo-700 font-bold" : ""}`
                          }
                        >
                          {y.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Fragment>
          ))}
        </ul>
      </aside>
      <div className="w-6/7">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
