import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../actions/auth";
const TopBar = () => {
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   const res = getUser();
  //   console.log(res);
  // }, []);

  return (
    <>
      <div className="h-14 bg-neutral-800 flex justify-between items-center p-4 sm:h-16 sm:px-10">
        <Link
          style={{
            color: "inherit",
            listStyle: "none",
            textDecoration: "none",
          }}
          to="/"
        >
          <div className="text-slate-50 text-2xl">⚡</div>
        </Link>
      </div>
    </>
  );
};

export default TopBar;
