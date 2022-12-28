import { NotificationInstance } from "antd/es/notification/interface";

export const successNotification = (
  api: NotificationInstance,
  description: string
) => {
  api.success({
    message: "Success",
    description,
    placement: "bottomLeft",
  });
};

export const errorNotification = (
  api: NotificationInstance,
  description: string
) => {
  api.error({
    message: "Error",
    description,
    placement: "bottomLeft",
  });
};
