import axios from "axios";
import label from "../../utils/label";
import http from "../../utils/http";
import { Spin, notification } from "antd";
import bgImg from "../../assets/img2.jpg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import classes from "./PractitionerForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import { errorNotification } from "../../utils/notification";
import { handleEmailValidation } from "../../utils/emailValidation";

interface fileType {
  type: string;
}

export default function PractitionerForm() {
  const history = useHistory();
  const required: Boolean = true;

  const [loading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | Blob>("");
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  let { practitioner_id } = useParams<{ practitioner_id?: string }>();

  const initialState = {
    fullName: "",
    email: "",
    contact: "",
    dob: "",
    workingDays: "",
    startTime: "",
    endTime: "",
  };

  let [practitionerDetail, setPractitionerDetail] = useState(initialState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (practitioner_id) {
      setIsLoading(true);
      http
        .get(`/practitioner/form/${practitioner_id}`)
        .then((response) => {
          setPractitionerDetail(response.data[0]);
        })
        .catch(() => {
          history.replace("/practitioner-not-found");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      reset((practitionerDetail = initialState));
    }
  }, [practitioner_id]);

  const onSubmit = (data: object) => {
    if (isPhotoChanged) {
      setIsLoading(true);

      const imageData = new FormData();

      imageData.append("file", photo);
      imageData.append("upload_preset", "practitioner_profile_management");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dly7e04zt/image/upload",
          imageData
        )
        .then((res) => {
          updatePractitionerData({ ...data, assetUrl: res.data.url });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      updatePractitionerData(data);
    }
  };

  const updatePractitionerData = (data: object) => {
    if (practitioner_id) {
      http
        .put(`/practitioner/${practitioner_id}`, data)
        .then(() => {
          history.replace("/practitioner");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            errorNotification(
              api,
              "Looks like the practitioner with that email already exist in the database."
            );
          } else {
            errorNotification(api, "Something went wrong.");
          }
        });
    } else {
      http
        .post("/practitioner", data)
        .then(() => {
          history.replace("/practitioner");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            errorNotification(
              api,
              "Looks like the practitioner with that email already exist in the database."
            );
          } else {
            errorNotification(api, "Something went wrong.");
          }
        });
    }
  };

  const setPhotoAfterValidation = (file: fileType | null | any) => {
    const acceptType = ["image/jpeg", "image/jpg", "image/png"];

    if (file && acceptType.includes(file.type)) {
      setPhoto(file);
      setIsPhotoChanged(true);
    } else {
      errorNotification(api, "Only jpg, jpeg and png file are allowed.");
    }
  };

  return (
    <section>
      {contextHolder}
      {loading && <Spin tip="Loading" size="large" />}
      {!loading && (
        <div className={classes?.addPractitioner}>
          <div className={classes?.col1}>
            <h2>{practitioner_id ? `Edit ` : `Add New `}Practitioner</h2>
            <div className={classes?.subTitle}>
              {practitioner_id
                ? `Update practitioner with new data.`
                : `Fill the details of new practitioner.`}
            </div>
            <form
              id="form"
              data-test="practitioner-form"
              className={classes?.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              {(practitionerDetail.fullName || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Full Name", required)}
                  <input
                    className={classes?.InputStyle}
                    type="text"
                    placeholder="Full Name"
                    defaultValue={practitionerDetail.fullName}
                    {...register("fullName", {
                      required: true,
                      minLength: 5,
                      pattern: {
                        value: /^[^\s]+(?:$|.*[^\s]+$)/,
                        message:
                          "No white space allowed at the beginning or at the end.",
                      },
                    })}
                  />
                </div>
              )}

              {errors.fullName?.type === "required" && (
                <div className={classes?.errorMsg}>Name is required.</div>
              )}

              {errors.fullName?.message && (
                <div className={classes?.errorMsg}>
                  {errors.fullName.message.toString()}
                </div>
              )}

              {errors.fullName?.type === "minLength" && (
                <div className={classes?.errorMsg}>
                  Minimum length should be 5.
                </div>
              )}

              {(practitionerDetail.email || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Email", required)}
                  <input
                    type="email"
                    defaultValue={practitionerDetail.email}
                    className={classes?.InputStyle}
                    {...register("email", {
                      required: true,
                      validate: handleEmailValidation,
                    })}
                    placeholder="Email"
                  />
                </div>
              )}

              {errors.email?.type === "required" && (
                <div className={classes?.errorMsg}>Email is required.</div>
              )}
              {errors.email?.message && (
                <div className={classes?.errorMsg}>
                  {errors.email.message?.toString()}
                </div>
              )}

              {(practitionerDetail.contact || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Contact", required)}
                  <input
                    type="number"
                    defaultValue={practitionerDetail.contact}
                    className={classes?.InputStyle}
                    {...register("contact", {
                      required: true,
                      minLength: 10,
                    })}
                    placeholder="Contact Number"
                  />
                </div>
              )}

              {errors.contact?.type === "minLength" && (
                <div className={classes?.errorMsg}>
                  Minimum length should be 10.
                </div>
              )}

              {errors.contact?.type === "required" && (
                <div className={classes?.errorMsg}>
                  Please provide your contact number.
                </div>
              )}

              {(practitionerDetail.dob || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Date of birth", required)}
                  <input
                    type="date"
                    defaultValue={practitionerDetail.dob}
                    className={classes?.InputStyle}
                    {...register("dob", {
                      required: true,
                    })}
                  />
                </div>
              )}

              {errors.dob?.type === "required" && (
                <div className={classes?.errorMsg}>
                  Please fill your date of birth.
                </div>
              )}

              {(practitionerDetail.workingDays || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Working Days", required)}
                  <input
                    type="number"
                    defaultValue={practitionerDetail.workingDays}
                    className={classes?.InputStyle}
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
                <div className={classes?.errorMsg}>
                  Please fill your number of working days.
                </div>
              )}

              {(practitionerDetail.startTime || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("Start Time", required)}
                  <input
                    type="Time"
                    defaultValue={practitionerDetail.startTime}
                    className={classes?.InputStyle}
                    {...register("startTime", {
                      required: true,
                    })}
                  />
                </div>
              )}

              {errors.startTime?.type === "required" && (
                <div className={classes?.errorMsg}>Please fill start time.</div>
              )}

              {(practitionerDetail.endTime || !practitioner_id) && (
                <div className={classes?.FormControl}>
                  {label("End Time", required)}
                  <input
                    type="Time"
                    defaultValue={practitionerDetail.endTime}
                    className={classes?.InputStyle}
                    {...register("endTime", {
                      required: true,
                    })}
                  />
                </div>
              )}

              {errors.endTime?.type === "required" && (
                <div className={classes?.errorMsg}>Please fill end time.</div>
              )}

              <div className={classes?.FormControl}>
                {label("Upload Photo")}
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className={classes?.uploadPhoto}
                  onChange={(e) =>
                    setPhotoAfterValidation(e.target.files && e.target.files[0])
                  }
                />
              </div>
              <button className="btn">
                {practitioner_id ? "Edit" : "Add"}
              </button>
            </form>
          </div>
          <div>
            <img src={bgImg} alt="Background Image" className={classes?.col2} />
          </div>
        </div>
      )}
    </section>
  );
}
