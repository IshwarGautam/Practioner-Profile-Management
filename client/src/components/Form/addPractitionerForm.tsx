import { useState } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../assets/img2.jpg";
import { http } from "../../services/http";
import { useHistory } from "react-router-dom";
import classes from "./addPractitionerForm.module.css";
import { handleEmailValidation } from "../../utils/emailValidation";

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
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.FormControl}>
              <label>Full Name:</label>
              <input
                className={classes.InputStyle}
                type="text"
                {...register("fullName", {
                  required: true,
                })}
                placeholder="Full Name"
              />
            </div>
            {errors.fullName?.type === "required" && (
              <div className={classes.errorMsg}>Name is required.</div>
            )}

            <div className={classes.FormControl}>
              <label>Email:</label>
              <input
                type="email"
                className={classes.InputStyle}
                {...register("email", {
                  required: true,
                  validate: handleEmailValidation,
                })}
                placeholder="Email"
              />
            </div>
            {errors.email?.type === "required" && (
              <div className={classes.errorMsg}>Email is required.</div>
            )}
            {errors.email?.message && (
              <div className={classes.errorMsg}>
                {errors.email.message?.toString()}
              </div>
            )}

            <div className={classes.FormControl}>
              <label>Contact:</label>
              <input
                type="number"
                className={classes.InputStyle}
                {...register("contact", {
                  required: true,
                  minLength: 10,
                })}
                placeholder="Contact Number"
              />
            </div>
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

            <div className={classes.FormControl}>
              <label>Date of birth:</label>
              <input
                type="date"
                className={classes.InputStyle}
                {...register("dob", {
                  required: true,
                })}
              />
            </div>
            {errors.dob?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your date of birth.
              </div>
            )}

            <div className={classes.FormControl}>
              <label>Working Days:</label>
              <input
                type="number"
                className={classes.InputStyle}
                min={1}
                max={7}
                {...register("workingDays", {
                  required: true,
                })}
                placeholder="Working Days"
              />
            </div>
            {errors.workingDays?.type === "required" && (
              <div className={classes.errorMsg}>
                Please fill your number of working days.
              </div>
            )}

            <div className={classes.FormControl}>
              <label>Start Time:</label>
              <input
                type="Time"
                className={classes.InputStyle}
                {...register("startTime", {
                  required: true,
                })}
              />
            </div>
            {errors.startTime?.type === "required" && (
              <div className={classes.errorMsg}>Please fill start time.</div>
            )}
            <div className={classes.FormControl}>
              <label>End Time:</label>
              <input
                type="Time"
                className={classes.InputStyle}
                {...register("endTime", {
                  required: true,
                })}
              />
            </div>
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
