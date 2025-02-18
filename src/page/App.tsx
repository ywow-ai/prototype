import { FC } from "react";
import { Route, Routes } from "react-router";
import { useOnRouteChange } from "../utils/routes/hook";
import Layout from "./Layout";
import Xx from "./Xx";

const App: FC = () => {
  useOnRouteChange((path) => {
    console.log("this route", path);
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Xx path="/" />} />
        <Route path="/categories" element={<Xx path="categories" />} />
        <Route path="/product-add" element={<Xx path="product-add" />} />
        <Route path="/products" element={<Xx path="products" />} />
        <Route
          path="products/product-list"
          element={<Xx path="products/product-list" />}
        />
        <Route
          path="products/product-grid"
          element={<Xx path="products/product-grid" />}
        />
        <Route path="/transactions" element={<Xx path="transactions" />} />
        <Route
          path="transactions/transaction-list"
          element={<Xx path="transactions/transaction-list" />}
        />
        <Route
          path="transactions/transaction-details"
          element={<Xx path="transactions/transaction-details" />}
        />
        <Route path="/sellers" element={<Xx path="sellers" />} />
        <Route
          path="sellers/seller-list"
          element={<Xx path="sellers/seller-list" />}
        />
        <Route
          path="sellers/seller-details"
          element={<Xx path="sellers/seller-details" />}
        />
        <Route path="/reviews" element={<Xx path="reviews" />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
