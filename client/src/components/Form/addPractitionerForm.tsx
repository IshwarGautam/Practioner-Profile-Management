import { useState } from "react";
import { useForm } from "react-hook-form";
import { http } from "../../services/http";
import bgImg from "../../assets/img2.jpg";

import { useHistory } from "react-router-dom";

import classes from "./addPractitionerForm.module.css";

export default function AddPractionerForm(props: object) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (data: object) => {
    http
      .post("/practitioner", data)
      .then(() => {
        history.replace("/practitioner");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className={classes.addPractitioner}>
        <div className={classes.col1}>
          <h2>Add New Practitioner</h2>
          <div className={classes.subTitle}>
            Fill the details of new practitioner.
          </div>
          <form
            id="form"
            className={classes.flexCol}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("fullName", {
                required: true,
              })}
              placeholder="Full Name"
            />
            {errors.fullName?.type === "required" && (
              <div className={classes.errorMsg}>Name is required.</div>
            )}

            <input
              type="text"
              {...register("email", {
                required: true,
              })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <div className={classes.errorMsg}>Email is required.</div>
            )}

            <input
              type="text"
              {...register("contact", {
                required: true,
              })}
              placeholder="Contact Number"
            />
            {errors.contact?.type === "required" && (
              <div className={classes.errorMsg}>
                Please provide your contact number.
              </div>
            )}

            <input
              type="text"
              {...register("dob", {
                required: true,
              })}
              placeholder="Date of Birth"
            />
            {errors.dob?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your date of birth.
              </div>
            )}

            <input
              type="text"
              {...register("workingDays", {
                required: true,
              })}
              placeholder="Working Days"
            />
            {errors.workingDays?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your number of working days.
              </div>
            )}

            <input
              type="text"
              {...register("startTime", {
                required: true,
              })}
              placeholder="Start Time"
            />
            {errors.startTime?.type === "required" && (
              <div className={classes.errorMsg}>Please fill start time.</div>
            )}

            <input
              type="text"
              {...register("endTime", {
                required: true,
              })}
              placeholder="End Time"
            />
            {errors.endTime?.type === "required" && (
              <div className={classes.errorMsg}>Please fill end time.</div>
            )}
            <button className="btn">Add</button>
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
