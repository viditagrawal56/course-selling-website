import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000" });

export const signUp = async (email, password, activeButton) => {
  let res = "";
  activeButton === "user"
    ? (res = await API.post("/users/signup", {
        username: email,
        password: password,
      }))
    : (res = await API.post("/admin/signup", {
        username: email,
        password: password,
      }));
  console.log(res.data);
};
export const logIn = async (email, password, activeButton) => {
  let res = "";

  //Handle Backend API Call

  if (activeButton === "user") {
    res = await API.post(
      "/users/login",
      {},
      {
        headers: {
          username: email,
          password: password,
        },
      }
    );
  } else {
    res = await API.post(
      "/admin/login",
      {},
      {
        headers: {
          username: email,
          password: password,
        },
      }
    );

    if (res.status >= 200 && res.status < 300) {
      console.log("Logged In SuccesFully");
      window.location.href = "/addCourse";
    } else {
      console.error("Request was not successful. Status code:", res.status);
    }
  }
  localStorage.setItem("token", res.data.token);
  console.log(res);
};
