import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { createNewJob, updateCurrentJob } from "../../services/jobService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalJob = (props) => {
  const { action, dataModalJob } = props;
  const defaultJobData = {
    title: "",
    companyId: "",
    careerId: "",
    address: "",
    numberEmployee: "",
    experience: "",
    level: "",
    salary: "",
    education: "",
    description: "",
    requirements: "",
    deadline: "",
    sourcePicture: "",
  };

  const validInputsDefault = {
    title: true,
    companyId: true,
    careerId: true,
    address: true,
    numberEmployee: true,
    experience: true,
    level: true,
    salary: true,
    education: true,
    description: true,
    requirements: true,
    deadline: true,
    sourcePicture: true,
  };

  const [JobData, setJobData] = useState(defaultJobData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  useEffect(() => {
    if (action === "UPDATE") {
      setJobData(dataModalJob);
    }
  }, [dataModalJob]);

  useEffect(() => {
    if (action === "CREATE") {
      setJobData({ ...JobData });
    }
  }, [action]);

  const handleOnChangeInput = (value, name) => {
    let _JobData = _.cloneDeep(JobData);
    _JobData[name] = value;
    setJobData(_JobData);
  };

  const checkValidateInputs = () => {
    // create Job
    if (action === "UPDATE") return true;
    setValidInputs(validInputsDefault);
    let arr = [
      "title",
      "companyId",
      "careerId",
      "address",
      "numberEmployee",
      "experience",
      "level",
      "salary",
      "education",
      "description",
      "requirements",
      "deadline",
      "sourcePicture",
    ];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!JobData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmJob = async () => {
    // create Job
    let check = checkValidateInputs();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewJob({ ...JobData })
          : await updateCurrentJob({ ...JobData });
      if (res && res.EC === 0) {
        props.onHide();
        setJobData({ ...defaultJobData });
        toast.success("UPDATE success");
      } else {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
        toast.error("UPDATE unsuccess");
      }
    }
  };

  const handleCloseModalJob = () => {
    props.onHide();
    setJobData(defaultJobData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-Job"
        onHide={() => handleCloseModalJob()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "CREATE new Job" : "Edit a Job"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-12 form-group">
              <label>Title:</label>
              <input
                className={
                  validInputs.title ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={JobData.title}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "title")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Company Id:</label>
              <input
                className={
                  validInputs.companyId
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.companyId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "companyId")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Career Id:</label>
              <input
                className={
                  validInputs.careerId
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.careerId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "careerId")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Number:</label>
              <input
                className={
                  validInputs.numberEmployee
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="number"
                value={JobData.numberEmployee}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "numberEmployee")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Experience:</label>
              <input
                className={
                  validInputs.experience
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.experience}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "experience")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Level:</label>
              <input
                className={
                  validInputs.level ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={JobData.level}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "level")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Salary:</label>
              <input
                className={
                  validInputs.salary
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.salary}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "salary")
                }
              />
            </div>

            <div className="col-12 col-sm-4 form-group">
              <label>Education:</label>
              <input
                className={
                  validInputs.education
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.education}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "education")
                }
              />
            </div>

            <div className="col-12 col-sm-4 form-group">
              <label>Requirements:</label>
              <input
                className={
                  validInputs.requirements
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.requirements}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "requirements")
                }
              />
            </div>

            <div className="col-12 col-sm-4 form-group">
              <label>Deadline:</label>
              <input
                className={
                  validInputs.deadline
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="date"
                value={JobData.deadline}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "deadline")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Description:</label>
              <input
                className={
                  validInputs.description
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.description}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "description")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Image:</label>
              <input
                className={
                  validInputs.sourcePicture
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.sourcePicture}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "sourcePicture")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalJob()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmJob()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalJob;
