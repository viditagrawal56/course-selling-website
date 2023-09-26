import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="text-slate-50 flex flex-col justify-center items-center py-48  text-center">
        <h1 className="text-2xl font-bold ">
          Welcome to Course<span className="text-amber-300">Zap</span>
        </h1>
        <h3 className="text-sm opacity-90 ">Where Learning Gets Zappy!</h3>
        <div className="text-sm my-4">
          Unlock Your Potential with Our Crash Courses in Lightning Speed!
        </div>
        <Link
          style={{
            color: "inherit",
            listStyle: "none",
            textDecoration: "none",
          }}
          to="/Auth"
        >
          <button className="bg-amber-300 text-slate-800 rounded-md p-2 text-sm font-medium hover:bg-yellow-300 transition-all ease-in delay-70 hover:-translate-y-1">
            Get started
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
