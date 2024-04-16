import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getJobInfo } from "../../services/jobService";
import "./JobInfo.scss";
import moment from "moment";
import CustomButton from "../Button/CustomButton";
import "tailwindcss/tailwind.css";

const JobInfo = (props) => {
  let { id } = useParams();
  const [job, setJob] = useState({});
  const [selected, setSelected] = useState("0");

  useEffect(() => {
    // setJob(jobs[id ?? 0]);
    handleGetJob();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const handleGetJob = async () => {
    let response = await getJobInfo(id);
    if (response && response.EC === 0) {
      setJob(response.DT);
      console.log(job);
    }
  };
  return (
    <div className="container mx-auto">
      {job ? (
        <>
          {/* <div>
            <span className="color">title:</span> {job.title}
          </div>
          <div>
            <span className="color">companyId: </span> {job.companyId}
          </div>
          <div>
            <span className="color">careerId: </span> {job.careerId}
          </div>
          <div>
            <span className="color">address: </span> {job.address}
          </div>
          <div>
            <span className="color">numberEmployee:</span> {job.numberEmployee}
          </div>
          <div>
            <span className="color">experience: </span> {job.experience}
          </div>
          <div>
            <span className="color">level: </span> {job.level}
          </div>
          <div>
            <span className="color">salary: </span> {job.salary}
          </div>
          <div>
            <span className="color">education: </span> {job.education}
          </div>
          <div>
            <span className="color">description: </span> {job.description}
          </div>
          <div>
            <span className="color">requirements: </span> {job.requirements}
          </div>
          <div>
            <span className="color">deadline: </span> {job.deadline}
          </div>
          <div>
            <span className="color">sourcePicture: </span> {job.sourcePicture}
          </div> */}

          <div className="container mx-auto">
            <div className="w-full flex flex-col md:flex-row gap-10">
              {/* LEFT SIDE */}
              <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
                <div className="w-full flex items-center justify-between"></div>
                <div className="w-3/4 flex gap-2">
                  <img
                    src={job.sourcePicture}
                    alt=""
                    className="w-20 h-20 md:w-24 md:h-20 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>not found job</>
      )}
    </div>
  );
};

export default JobInfo;
