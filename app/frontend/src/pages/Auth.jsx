import { useState } from "react";
import { signUp, logIn } from "../actions/auth.js";
const Auth = () => {
  const [isSignup, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeButton, setActiveButton] = useState("user");

  const handleActiveButton = (activeButton) => {
    setActiveButton(activeButton);
  };

  const handleSwitch = () => {
    setIsSignUp(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Email and Password should not consist of spaces!");
    }
    !isSignup
      ? logIn(email, password, activeButton)
      : signUp(email, password, activeButton);
  };

  return (
    <>
      <div className="flex flex-col justify-center text-white mt-24 items-center w-full px-10">
        <div className="mb-9">
          <h1 className="text-3xl font-bold ">
            Course<span className="text-amber-300">Zap</span>
          </h1>
        </div>
        <div className="flex w-full ">
          <button
            className={`${
              activeButton === "user"
                ? "border-2 !bg-opacity-30"
                : "text-gray-400"
            } flex w-full justify-around items-center align-middle bg-amber-300 bg-opacity-5 hover:bg-opacity-10 border-amber-300  h-12 cursor-pointer`}
            onClick={() => handleActiveButton("user")}
          >
            User
          </button>
          <button
            className={`${
              activeButton === "admin"
                ? "border-2 !bg-opacity-50"
                : "text-gray-400"
            } flex w-full justify-around items-center align-middle bg-amber-300 bg-opacity-5 hover:bg-opacity-10 border-amber-300  h-12 cursor-pointer`}
            onClick={() => handleActiveButton("admin")}
          >
            Admin
          </button>
        </div>
        <p className="my-10 text-lg w-full">
          {!isSignup
            ? "Please Log In to your account"
            : "Please Create your account"}
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-slate-800 bg-amber-300 hover:bg-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
          >
            {!isSignup ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="my-4 text-xs text-center w-full">
          {!isSignup ? "Don't Have an Account? " : "Already Have an Account? "}
          <button
            onClick={handleSwitch}
            className="text-amber-300 underline underline-offset-2"
          >
            {!isSignup ? "Sign Up!" : "Log In!"}
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;
