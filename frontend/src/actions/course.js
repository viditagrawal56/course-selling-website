import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export const createCourse = async (
  imageLink,
  title,
  description,
  price,
  published
) => {
  const res = await API.post("/admin/courses", {
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
    published: published,
  });

  console.log(res.data);
};

export const updateCourse = async (
  imageLink,
  title,
  description,
  price,
  published,
  courseId
) => {
  const res = await API.put("/admin/courses/" + courseId, {
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
    published: published,
  });
  console.log(res.data);
};

export const getAllCourses = async () => {
  const res = await API.get("/admin/courses");
  return res.data;
};
