import { useNavigate } from "react-router-dom";

const Course = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Course/${props.course._id}`);
  };
  return (
    <>
      <div className="flex justify-center text-slate-50 my-6">
        <div
          className="bg-neutral-900 flex flex-col gap-2 p-3 pb-5 rounded-lg w-80 group drop-shadow-lg hover:scale-105 transition-all ease-out delay-100 cursor-pointer"
          onClick={handleClick}
        >
          <div className="container rounded-lg mb-2 max-h-60">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={props.course.imageLink}
              alt="course-image"
            />
          </div>
          <div className="border border-neutral-700 group-hover:border-amber-300 transition-all ease-out delay-100"></div>
          <p className="text-xs">Vladimir Putin</p>
          <h1 className="text-lg font-medium">{props.course.title}</h1>
          <p className="text-sm">{props.course.description}</p>
          <p className="font-medium">{props.course.price}</p>
        </div>
      </div>
    </>
  );
};

export default Course;
