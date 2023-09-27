import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../actions/course";
import Course from "../components/Course";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        console.log(res.courses);
        setCourses(res.courses);
      } catch (error) {
        console.error(error);
      }
    };

    getCourses();
  }, []);
  //   useEffect(() => {
  //     getAllCourses();
  //   }, []);
  return (
    <>
      <Link
        style={{
          color: "inherit",
          listStyle: "none",
          textDecoration: "none",
        }}
        to="/AddCourse"
      >
        <button className="text-slate-800 bg-amber-300 hover:bg-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">
          Create A Course
        </button>
      </Link>
      <div className="text-slate-50">Courses</div>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </>
  );
};

export default Courses;
