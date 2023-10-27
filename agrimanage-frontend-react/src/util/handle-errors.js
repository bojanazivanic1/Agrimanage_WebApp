import { toast } from "react-toastify";

export const handleError = (error) => {
    if (error.response //error with http request
        && error.response.data //server didn't send data as a response
        && error.response.data.errors) {//errors in individual fields
        const errorMessages = Object.values(error.response.data.errors).join("\n"); //array
        toast.warning(errorMessages);
    } else if (error.response && error.response.data && error.response.data.Exception) {
        toast.warning(error.response.data.Exception); //global error as a response
    }
}