import { useEffect, useState } from "react";
import { getAllCourses } from "../actions/course";
import { useParams } from "react-router-dom";
import Course from "../components/Course";
import Loader from "../components/Loader";
import UpdateForm from "../components/UpdateForm";
const EditCourse = () => {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, []);

  let course = courses.find((course) => course._id === courseId);

  if (!course) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-5">
        <Course course={course} />
        <UpdateForm courseId={courseId} />
      </div>
    </>
  );
};

export default EditCourse;
