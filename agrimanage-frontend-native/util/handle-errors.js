import { ToastAndroid } from "react-native";

export const handleError = (error) => {
  if (
    error.response && //error with http request
    error.response.data && //server didn't send data as a response
    error.response.data.errors
  ) {
    //errors in individual fields
    const errorMessages = Object.values(error.response.data.errors).join("\n"); //array
    ToastAndroid.showWithGravity(
      errorMessages,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.Exception
  ) {
    ToastAndroid.showWithGravity(
      error.response.data.Exception,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }
};
