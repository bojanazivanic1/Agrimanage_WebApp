import { useState } from "react";
import { toast } from "react-toastify";

const useForm = (initial, submitHandler) => {
  const [inputs, setInputs] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field in inputs) {
      if (inputs[field] === "") {
        toast.warning("All fields must be filled.");
        return;
      }
    }

    submitHandler(inputs);
  }

  const resetForm = () => {
    setInputs(initial);
  }

  return {
    inputs,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
