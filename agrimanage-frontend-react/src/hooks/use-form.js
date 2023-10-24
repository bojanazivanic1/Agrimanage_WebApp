import { useEffect, useState } from "react";

const useForm = (initial, submitHandler) => {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      value = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //resetForm();

    submitHandler(inputs);
  }

  function resetForm() {
    setInputs(initial);
  }

  return {
    inputs,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
