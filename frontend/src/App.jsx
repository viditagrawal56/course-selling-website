import "./App.css";
import TopBar from "./components/TopBar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Signup" element={<SignUp />}></Route>
        <Route path="/Login" element={<LogIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
