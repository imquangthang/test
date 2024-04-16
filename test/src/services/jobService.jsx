import axios from "../setup/axios";

const fetchAllJob = (page, limit, jobQuery) => {
  return axios.get(
    `/api/v1/job/read?page=${page}&limit=${limit}&title=${jobQuery.title}&address=${jobQuery.address}&salary=${jobQuery.salary}&experience=${jobQuery.experience}`
  );
};

const fetchAllCompanyJob = (page, limit, email, jobQuery) => {
  return axios.get(
    `/api/v1/job/read/company-job?page=${page}&limit=${limit}&title=${jobQuery.title}&address=${jobQuery.address}&salary=${jobQuery.salary}&experience=${jobQuery.experience}&email=${email}`
  );
};

const createNewJob = (jobData) => {
  return axios.post("/api/v1/job/create", {
    ...jobData,
  });
};

const updateCurrentJob = (jobData) => {
  return axios.put("/api/v1/job/update", {
    ...jobData,
  });
};

const deleteJob = (job) => {
  return axios.delete("/api/v1/job/delete", {
    data: { id: job.id },
  });
};

const getListAddress = () => {
  return axios.get("/api/v1/job/read/getAddress");
};

const getJobInfo = (id) => {
  return axios.get(`/api/v1/job/read/job-info?id=${id}`);
};

export {
  fetchAllJob,
  updateCurrentJob,
  createNewJob,
  deleteJob,
  getListAddress,
  fetchAllCompanyJob,
  getJobInfo,
};
