import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3000" });

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
