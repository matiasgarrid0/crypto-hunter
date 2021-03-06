import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { HomePage } from "./Components/HomePage";
import { Detail } from "./Components/Detail";
import { Fotter } from "./Components/Fotter";
import {Alerts} from './Components/Auth/Alert'

function App() {
  return (
    <>
      <div style={{ backgroundColor: "#16181f" }}>
        <Header />
        <Alerts/>
        <Routes>
          <Route exact path={"/"} element={<HomePage />} />
          <Route exact path={"/coin/:id"} element={<Detail />} />
        </Routes>
        <Fotter />
      </div>
    </>
  );
}

export default App;
