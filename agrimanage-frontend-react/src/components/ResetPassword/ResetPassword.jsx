import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { resetPassword, confirmPassword } from "../../services/authService";
import useForm from "../../hooks/use-form";

const ResetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const initialEmailInputs = {
    email: "",
  };

  const initialResetInputs = {
    code: "",
    password: "",
    confirmPassword: "",
  };

  const emailSubmitHandler = async (inputs) => {
    if (inputs.email === "") {
      toast.warning("Email field must be filled.");
      return;
    }
    resetPassword(inputs).then((res) => {
      setIsEmailSent(true);
      sessionStorage.setItem("email", inputs.email);
    });
  };

  const resetSubmitHandler = async (inputs) => {
    for (let field in Object.values(inputs)) {
      if (field === "") {
        toast.warning("All fields must be filled.");
        return;
      }
    }
    confirmPassword({ ...inputs, email: sessionStorage.email });
    sessionStorage.removeItem("email");
    navigate("/login");
  };

  const {
    inputs: emailInputs,
    handleChange: emailHandleChange,
    handleSubmit: emailHandleSubmit,
    resetForm: resetEmailForm,
  } = useForm(initialEmailInputs, emailSubmitHandler);

  const {
    inputs: resetInputs,
    handleChange: resetHandleChange,
    handleSubmit: resetHandleSubmit,
    resetForm: resetPasswordForm,
  } = useForm(initialResetInputs, resetSubmitHandler);

  return (
    <>
      {!isEmailSent ? (
        <Card className="card" component="form">
          <CardContent>
            <TextField
              required
              type="email"
              id="email"
              name="email"
              label="Email"
              value={emailInputs.email}
              onChange={emailHandleChange}
            />
          </CardContent>
          <Button className="button" onClick={emailHandleSubmit}>
            Send Email
          </Button>
        </Card>
      ) : (
        <Card className="card" component="form">
          <CardContent>
            <TextField
              required
              type="text"
              id="code"
              name="code"
              label="Code"
              value={resetInputs.code}
              onChange={resetHandleChange}
            />
            <br />
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              value={resetInputs.password}
              onChange={resetHandleChange}
            />
            <TextField
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={resetInputs.confirmPassword}
              onChange={resetHandleChange}
            />
          </CardContent>
          <Button className="button" onClick={resetHandleSubmit}>
            Reset Password
          </Button>
        </Card>
      )}
    </>
  );
};

export default ResetPassword;
