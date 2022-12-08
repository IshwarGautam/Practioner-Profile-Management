import bgImg from "../../assets/img2.jpg";
import { useForm } from "react-hook-form";
import { http } from "../../services/http";
import { useEffect, useState } from "react";
import classes from "./addPractitionerForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import { handleEmailValidation } from "../../utils/emailValidation";

type propsType = {
  token: string;
};

export default function AddPractionerForm(props: propsType) {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (data: any) => {
    if (practitioner_id) {
      http
        .put(`/practitioner/${practitioner_id}`, data, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then(() => {
          history.replace("/practitioner");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      http
        .post("/practitioner", data, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then(() => {
          history.replace("/practitioner");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let [practitionerDetail, setPractitionerDetail] = useState({
    fullName: "",
    email: "",
    contact: "",
    dob: "",
    workingDays: "",
    startTime: "",
    endTime: "",
  });

  const { practitioner_id } = useParams<{ practitioner_id?: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (practitioner_id) {
    useEffect(() => {
      http
        .get(`/practitioner/form/${practitioner_id}`, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then((response) => {
          setPractitionerDetail(response.data[0]);
        })
        .catch((error) => console.log(error));
    }, []);
  }

  return (
    <section>
      <div className={classes.addPractitioner}>
        <div className={classes.col1}>
          <h2>{practitioner_id ? `Edit ` : `Add New `}Practitioner</h2>
          <div className={classes.subTitle}>
            {practitioner_id
              ? `Update practitioner with new data.`
              : `Fill the details of new practitioner.`}
          </div>
          <form
            id="form"
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            {(practitionerDetail.fullName || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Full Name:</label>
                <input
                  className={classes.InputStyle}
                  type="text"
                  placeholder="Full Name"
                  defaultValue={practitionerDetail.fullName}
                  {...register("fullName", {
                    required: true,
                  })}
                />
              </div>
            )}

            {errors.fullName?.type === "required" && (
              <div className={classes.errorMsg}>Name is required.</div>
            )}

            {(practitionerDetail.email || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Email:</label>
                <input
                  type="email"
                  defaultValue={practitionerDetail.email}
                  className={classes.InputStyle}
                  {...register("email", {
                    required: true,
                    validate: handleEmailValidation,
                  })}
                  placeholder="Email"
                />
              </div>
            )}

            {errors.email?.type === "required" && (
              <div className={classes.errorMsg}>Email is required.</div>
            )}
            {errors.email?.message && (
              <div className={classes.errorMsg}>
                {errors.email.message?.toString()}
              </div>
            )}

            {(practitionerDetail.contact || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Contact:</label>
                <input
                  type="number"
                  defaultValue={practitionerDetail.contact}
                  className={classes.InputStyle}
                  {...register("contact", {
                    required: true,
                    minLength: 10,
                  })}
                  placeholder="Contact Number"
                />
              </div>
            )}

            {errors.contact?.type === "minLength" && (
              <div className={classes.errorMsg}>
                Minimum length should be 10.
              </div>
            )}

            {errors.contact?.type === "required" && (
              <div className={classes.errorMsg}>
                Please provide your contact number.
              </div>
            )}

            {(practitionerDetail.dob || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Date of birth:</label>
                <input
                  type="date"
                  defaultValue={practitionerDetail.dob}
                  className={classes.InputStyle}
                  {...register("dob", {
                    required: true,
                  })}
                />
              </div>
            )}

            {errors.dob?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your date of birth.
              </div>
            )}

            {(practitionerDetail.workingDays || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Working Days:</label>
                <input
                  type="number"
                  defaultValue={practitionerDetail.workingDays}
                  className={classes.InputStyle}
                  min={1}
                  max={7}
                  {...register("workingDays", {
                    required: true,
                  })}
                  placeholder="Working Days"
                />
              </div>
            )}

            {errors.workingDays?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your number of working days.
              </div>
            )}

            {(practitionerDetail.startTime || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>Start Time:</label>
                <input
                  type="Time"
                  defaultValue={practitionerDetail.startTime}
                  className={classes.InputStyle}
                  {...register("startTime", {
                    required: true,
                  })}
                />
              </div>
            )}

            {errors.startTime?.type === "required" && (
              <div className={classes.errorMsg}>Please fill start time.</div>
            )}

            {(practitionerDetail.endTime || !practitioner_id) && (
              <div className={classes.FormControl}>
                <label>End Time:</label>
                <input
                  type="Time"
                  defaultValue={practitionerDetail.endTime}
                  className={classes.InputStyle}
                  {...register("endTime", {
                    required: true,
                  })}
                />
              </div>
            )}

            {errors.endTime?.type === "required" && (
              <div className={classes.errorMsg}>Please fill end time.</div>
            )}
            <button className="btn">{practitioner_id ? "Edit" : "Add"}</button>
            {errorMessage && (
              <div className={classes.errorMsg}> {errorMessage} </div>
            )}
          </form>
        </div>
        <div>
          <img src={bgImg} alt="Background Image" className={classes.col2} />
        </div>
      </div>
    </section>
  );
}
