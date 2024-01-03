import React, { useState } from "react";
// import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-col justify-center text-white mt-32 items-center w-full px-10">
        <p className="mb-10 text-lg w-full">Please Create your Account</p>
        <form className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
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
            type="button"
            onClick={async () => {
              if (!username.trim() || !password.trim()) {
                console.error("Please enter username and password");
                return;
              }
              try {
                const res = await axios.post(
                  "http://localhost:3000/admin/signup",
                  {
                    username: username,
                    password: password,
                  }
                );
                let data = res.data;
                console.log(data);
              } catch (e) {
                console.log(e);
              }
            }}
            className="text-slate-800 bg-amber-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
          >
            Submit
          </button>
        </form>
        <Link className="w-full" to="/LogIn">
          <button
            onClick={handleSwitch}
            className="my-4 w-full text-amber-300 ring-2 focus:outline-none ring-amber-300 font-medium rounded-lg text-sm sm:w-auto py-2.5 text-center"
          >
            Sign In
          </button>
        </Link>
      </div>
    </>
  );
};
export default SignUp;
// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   return (
//     <>
//       <Box
//         sx={{
//           height: "100vh",
//           backgroundColor: "#eeee",
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h5">
//           Welcome To Coursera, Please Sign up
//         </Typography>
//         <Card
//           variant="outlined"
//           sx={{
//             minWidth: 500,
//             backgroundColor: "#ffff",
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//             justifyContent: "center",
//             gap: "10px",
//             padding: "2rem",
//           }}
//         >
//           <TextField
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//             fullWidth
//             id="outlined-basic"
//             label="Username"
//             variant="outlined"
//           />
//           <TextField
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             fullWidth
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//           />
//           <Button
//             variant="contained"
//             onClick={() => {
//               fetch("http://localhost:3000/admin/signup", {
//                 method: "POST",
//                 body: JSON.stringify({
//                   username: username,
//                   password: password,
//                 }),
//                 headers: {
//                   "Content-type": "application/json",
//                 },
//               })
//                 .then((res) => res.json())
//                 .then((data) => {
//                   console.log(data);
//                 });
//             }}
//           >
//             Sign Up
//           </Button>
//         </Card>
//       </Box>
//     </>
//   );
// };

// export default SignUp;
