import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

// const headers = {
//   Authorization: "Bearer " + localStorage.getItem("token"), // Example authorization header
// };

// const axiosConfig = {
//   method: "GET", // HTTP method (GET, POST, PUT, DELETE, etc.)
//   url: "http://localhost:3000/admin/courses", // URL of the API endpoint
//   headers: headers, // Include your headers here
//   // Additional configuration options if needed
// };
export const createCourse = async (
  imageLink,
  title,
  description,
  price,
  published
) => {
  const res = await API.post(
    "/admin/courses",
    {
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: published,
    },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );

  console.log(res.data);
};

export const getAllCourses = async () => {
  const res = await API.get("/admin/courses");
  // console.log(res.data);
  return res.data;
  // axios(axiosConfig)
  //   .then((response) => {
  //     // Handle the response
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error(error);
  //   });
  // return res;
};
