import { Button, Card, CardContent, TextField } from "@mui/material";
import useForm from "../../hooks/use-form";
import { confirmPassword, resetPassword } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const {
    inputs: emailInputs,
    handleChange: emailHandleChange,
    handleSubmit: emailHandleSubmit,
  } = useForm(
    {
      email: "",
    },
    async (formData) => {
      await resetPassword(formData).then(() => {
        setIsEmailSent(() => true);
        sessionStorage.setItem("email", emailInputs.email);
      });
    }
  );

  const {
    inputs: resetInputs,
    handleChange: resetHandleChange,
    handleSubmit: resetHandleSubmit,
  } = useForm(
    {
      code: "",
      password: "",
      confirmPassword: "",
    },
    async (formData) => {
      await confirmPassword({ ...formData, email: sessionStorage.email }).then(
        () => {
          sessionStorage.removeItem("email");
          navigate("/login");
        }
      );
    }
  );

  return (
    <>
      {!isEmailSent ? (
        <Card component="form">
          <CardContent>
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="email"
              id="email"
              name="email"
              label="Email"
              value={emailInputs.email}
              onChange={emailHandleChange}
            />
          </CardContent>
          <Button onClick={emailHandleSubmit}>Send Email</Button>
        </Card>
      ) : (
        <Card component="form">
          <CardContent>
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
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
              sx={{ marginBottom: "10px", width: "100%" }}
              type="password"
              id="password"
              name="password"
              label="Password"
              value={resetInputs.password}
              onChange={resetHandleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={resetInputs.confirmPassword}
              onChange={resetHandleChange}
            />
          </CardContent>
          <Button onClick={resetHandleSubmit}>Reset Password</Button>
        </Card>
      )}
    </>
  );
};

export default ResetPassword;
