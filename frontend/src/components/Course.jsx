import vladmirImg from "../../public/vladmir.png";
const Course = () => {
  return (
    <>
      <div className="flex justify-center text-slate-50">
        <div className="bg-neutral-900 flex flex-col gap-2 p-3 pb-5 rounded-lg w-80 group drop-shadow-lg hover:scale-105 transition-all ease-out delay-100 cursor-pointer">
          <img
            className="rounded-lg mb-2"
            src={vladmirImg}
            alt="course-image"
          />
          <div className="border border-neutral-700 group-hover:border-amber-300 transition-all ease-out delay-100"></div>
          <p className="text-xs">Vladimir Putin</p>
          <h1 className="text-lg font-medium">Russian Horse Riding</h1>
          <p className="text-sm">
            Learn how to ride a russian horse from a professional rider
          </p>
          <p className="font-medium">$1000</p>
        </div>
      </div>
    </>
  );
};

export default Course;
