import { Route, Routes } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/header/Header";
import { PATHS } from "./constants/constants";
import { ListPage } from "./pages/ListPage";
import { ItemPage } from "./pages/AdPage";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.form} element={<FormPage />} key={window.location.pathname}/>
        <Route path={PATHS.list} element={<ListPage />} />
        <Route path={PATHS.item} element={<ItemPage />} />
      </Routes>
    </>
  );
}

export default App;
