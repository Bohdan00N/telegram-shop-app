import { useEffect } from "react";
import css from "./App.module.scss";
import { useTG } from "./hooks/useTG";
import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";





function App() {
  const {onToggleButton, tg} = useTG();


  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className={css.app}>
      <Header></Header>
      <Button onClick={onToggleButton}>Toggle</Button>
    </div>
  );
}

export default App;
