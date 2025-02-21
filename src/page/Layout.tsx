import { FC, Fragment } from "react";
import {
  NavLink,
  type NavLinkProps,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router";

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

const Layout: FC = () => {
  const { pathname } = useLocation();

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
        <Outlet context={useOutletContext()} />
      </div>
    </div>
  );
};

export default Layout;
