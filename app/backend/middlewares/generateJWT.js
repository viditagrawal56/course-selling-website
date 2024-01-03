import jwt from "jsonwebtoken";

//FUNCTION TO GENERATE A TOKEN PROVIDED THE USERS USERNAME
const generateJWT = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export default generateJWT;
