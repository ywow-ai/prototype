import { FC } from "react";
import { NavLink, Outlet } from "react-router";

const Layout: FC = () => {
  return (
    <div className="flex">
      <aside className="w-1/7 pl-4">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="product-add">Product Add</NavLink>
          </li>
          <li>
            <NavLink to="products">Products</NavLink>
            <div className="pl-4">
              <ul>
                <li>
                  <NavLink to="products/product-list">Product List</NavLink>
                </li>
                <li>
                  <NavLink to="products/product-grid">Product Grid</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="transactions">Transactions</NavLink>
            <div className="pl-4">
              <ul>
                <li>
                  <NavLink to="transactions/transaction-list">
                    Transaction List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="transactions/transaction-details">
                    Transaction Details
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="sellers">Sellers</NavLink>
            <div className="pl-4">
              <ul>
                <li>
                  <NavLink to="sellers/seller-list">Seller List</NavLink>
                </li>
                <li>
                  <NavLink to="sellers/seller-details">Seller Details</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </aside>
      <div className="w-6/7">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
