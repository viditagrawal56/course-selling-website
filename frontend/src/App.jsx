import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import { AddCourse } from "./pages/AddCourse";
function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Auth" element={<Auth />}></Route>
        <Route path="/AddCourse" element={<AddCourse />}></Route>
      </Routes>
    </>
  );
}

export default App;
