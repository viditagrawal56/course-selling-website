import React from "react";
import { Link } from "react-router-dom";
// import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const TopBar = () => {
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
        {/* <Link
          style={{
            color: "inherit",
            listStyle: "none",
            textDecoration: "none",
          }}
          to="/Login"
        >
          <button className="text-slate-50 text-l underline underline-offset-8 decoration-amber-300">
            Sign In
          </button>
        </Link> */}
      </div>
    </>
  );
};

export default TopBar;

// const TopBar = () => {
//   return (
//     <>
//       <AppBar position="fixed">
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             backgroundColor: "#499bff",
//           }}
//         >
//           <Typography variant="h6">
//             <Link
//               style={{
//                 color: "inherit",
//                 listStyle: "none",
//                 textDecoration: "none",
//               }}
//               to="/"
//             >
//               Coursera
//             </Link>
//           </Typography>
//           <Box sx={{ display: "flex", gap: "20px" }}>
//             <Link
//               style={{
//                 color: "inherit",
//                 listStyle: "none",
//                 textDecoration: "none",
//               }}
//               to="/Signup"
//             >
//               <Button variant="contained">Sign Up</Button>
//             </Link>
//             <Link
//               style={{
//                 color: "inherit",
//                 listStyle: "none",
//                 textDecoration: "none",
//               }}
//               to="/Login"
//             >
//               <Button variant="contained">Log In</Button>
//             </Link>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// };

// export default TopBar;
