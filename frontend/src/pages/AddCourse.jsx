import { useState } from "react";
import { createCourse } from "../actions/course.js";
export const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      !imageLink.trim() ||
      !price.trim()
    ) {
      alert("Title, Description and Image should not only consist of spaces!");
    }

    createCourse(imageLink, title, description, price, published);

    setImageLink("");
    setTitle("");
    setDescription("");
    setPrice("");
    setPublished(false);
  };

  const handleCheckBoxChange = () => {
    setPublished(!published);
  };

  return (
    <>
      <div className="flex flex-col justify-center text-white mt-32 items-center w-full px-10">
        <p className="my-10 text-lg w-full">Create Your Course</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
              value={imageLink}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Image
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-amber-300 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Price
            </label>
          </div>
          <div>
            <input
              className="accent-amber-300 mb-6"
              type="checkbox"
              checked={published}
              onChange={handleCheckBoxChange}
            />
            <label className="text-sm">Published</label>
          </div>
          <button
            className="text-slate-800 bg-amber-300 hover:bg-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"
            type="submit"
          >
            Create Course
          </button>
        </form>
      </div>
    </>
  );
};
