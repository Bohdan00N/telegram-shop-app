import { useEffect } from "react";
import css from "./App.module.scss";
import { useTG } from "./hooks/useTG";
import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "./components/ProductList/ProductList.jsx";
import { Form } from "./components/Form/Form.jsx";

function App() {
  const { onToggleButton, tg } = useTG();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={css.app}>
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
      <Button onClick={onToggleButton}>Toggle</Button>
    </div>
  );
}

export default App;
