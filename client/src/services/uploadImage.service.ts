import axios from "axios";

export const uploadImage = (data: object, photo: string | Blob) => {
  const imageData = new FormData();

  imageData.append("file", photo);
  imageData.append("upload_preset", "practitioner_profile_management");

  return axios
    .post("https://api.cloudinary.com/v1_1/dly7e04zt/image/upload", imageData)
    .then((res) => {
      return { response: res };
    })
    .catch(() => {
      return { response: null };
    });
};
