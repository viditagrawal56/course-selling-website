import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000" });

export const signUp = async (email, password, activeButton) => {
  let res = "";
  try {
    activeButton === "user"
      ? (res = await API.post("/users/signup", {
          username: email,
          password: password,
        }))
      : (res = await API.post("/admin/signup", {
          username: email,
          password: password,
        }));
    alert(res.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
};
export const logIn = async (email, password, activeButton) => {
  let res = "";

  //Handle Backend API Call
  try {
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
    }
    localStorage.setItem("token", res.data.token);
    if (res.status >= 200 && res.status < 300) {
      alert("Logged In SuccesFully");
      window.location.href = "/Courses";
    } else {
      console.error("Request was not successful. Status code:", res.status);
    }
    console.log(res.data);
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const getUser = async () => {
  const res = await API.get("/admin/me", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  return res.data;
};
