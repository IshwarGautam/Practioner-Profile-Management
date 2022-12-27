export const successNotification = (api: any, description: string) => {
  api.success({
    message: "Success",
    description,
    placement: "bottomLeft",
  });
};

export const errorNotification = (api: any, description: string) => {
  api.error({
    message: "Error",
    description,
    placement: "bottomLeft",
  });
};
