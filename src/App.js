import { useEffect } from "react";
import css from "./App.module.scss";
import { useTG } from "./hooks/useTG.js";
import { Header } from "./components/Header/Header.jsx";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList.jsx";
import Form from "./components/Form/Form.jsx";
import { CartProvider } from "./hooks/cartContext.js";

function App() {
  const { tg } = useTG();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={css.app}>
      <CartProvider>
        <Header />
        <Routes>
          <Route index element={<ProductList />} />
          <Route path={"form"} element={<Form />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
