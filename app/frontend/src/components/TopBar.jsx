import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../actions/auth";
const TopBar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUserName = async () => {
      try {
        const res = await getUser();
        setUsername(res.username);
      } catch (error) {
        console.log(error);
      }
    };
    getUserName();
  }, []);

  const handleLogOut = () => {
    localStorage.setItem("token", null);
    setUsername("");
  };

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
          <div className="text-slate-50 text-3xl">⚡</div>
        </Link>
        <div className="text-slate-50 text-xs">{username}</div>
        <Link
          style={{
            color: "inherit",
            listStyle: "none",
            textDecoration: "none",
          }}
          to="/"
        >
          {username && (
            <button
              onClick={handleLogOut}
              className="bg-amber-300 text-slate-800 rounded-md p-2 text-sm font-medium hover:bg-yellow-300 transition-all ease-in delay-70"
            >
              Log Out
            </button>
          )}
        </Link>
      </div>
    </>
  );
};

export default TopBar;
