import label from "../../utils/label";
import { Spin, notification } from "antd";
import bgImg from "../../assets/img2.jpg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import classes from "./PractitionerForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import { errorNotification } from "../../utils/notification";
import { uploadImage } from "../../services/uploadImage.service";
import { handleEmailValidation } from "../../utils/emailValidation";
import {
  getPractitioner,
  addPractitioner,
  updatePractitioner,
} from "../../services/practitioner.service";

interface fileType {
  type: string;
}

export default function PractitionerForm() {
  const history = useHistory();
  const required = true;

  const [loading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | Blob>("");
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const { practitioner_id } = useParams<{ practitioner_id?: string }>();

  const initialState = {
    fullName: "",
    email: "",
    contact: "",
    dob: "",
    workingDays: "",
    startTime: "",
    endTime: "",
  };

  const [practitionerDetail, setPractitionerDetail] = useState(initialState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (practitioner_id) {
      setIsLoading(true);

      (async () => {
        const { response } = await getPractitioner(practitioner_id, history);
        if (response) {
          setPractitionerDetail(response);
        }
      })();

      setIsLoading(false);
    } else {
      setPractitionerDetail(initialState);
      reset(practitionerDetail);
    }
  }, [practitioner_id]);

  const onSubmit = async (data: object) => {
    if (isPhotoChanged) {
      setIsLoading(true);

      const { response } = await uploadImage(data, photo);

      if (response) {
        await updatePractitionerData({ ...data, assetUrl: response.data.url });
      }

      setIsLoading(false);
    } else {
      updatePractitionerData(data);
    }
  };

  const updatePractitionerData = async (data: object) => {
    if (practitioner_id) {
      const { errorMessage } = await updatePractitioner(
        practitioner_id,
        data,
        history
      );

      if (errorMessage) {
        errorNotification(api, errorMessage);
      }
    } else {
      const { errorMessage } = await addPractitioner(data, history);

      if (errorMessage) {
        errorNotification(api, errorMessage);
      }
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
      {!loading &&
        (practitionerDetail !== initialState || !practitioner_id) && (
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

                {errors.email?.type === "required" && (
                  <div className={classes?.errorMsg}>Email is required.</div>
                )}
                {errors.email?.message && (
                  <div className={classes?.errorMsg}>
                    {errors.email.message?.toString()}
                  </div>
                )}

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

                {errors.dob?.type === "required" && (
                  <div className={classes?.errorMsg}>
                    Please fill your date of birth.
                  </div>
                )}

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

                {errors.workingDays?.type === "required" && (
                  <div className={classes?.errorMsg}>
                    Please fill your number of working days.
                  </div>
                )}

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

                {errors.startTime?.type === "required" && (
                  <div className={classes?.errorMsg}>
                    Please fill start time.
                  </div>
                )}

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

                {errors.endTime?.type === "required" && (
                  <div className={classes?.errorMsg}>Please fill end time.</div>
                )}

                <div className={classes?.FormControl}>
                  {label("Upload Photo")}
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className={classes?.uploadPhoto}
                    data-testid="input-file"
                    onChange={(e) =>
                      setPhotoAfterValidation(
                        e.target.files && e.target.files[0]
                      )
                    }
                  />
                </div>
                <button className="btn">
                  {practitioner_id ? "Edit" : "Add"}
                </button>
              </form>
            </div>
            <div>
              <img
                src={bgImg}
                alt="Background Image"
                className={classes?.col2}
              />
            </div>
          </div>
        )}
    </section>
  );
}
