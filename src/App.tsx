import "./scss/app.scss";
import Loadable from "react-loadable";

import React from "react";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart"),
  loading: () => <div>Идет загрузка корзины...</div>,
});
const FullPizzas = React.lazy(
  () => import(/*webpackChunkName: "FullPizzas"*/ "./pages/FullPizzas")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizzas />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
