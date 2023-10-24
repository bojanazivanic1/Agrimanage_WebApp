import { Button, Card, CardContent, TextField } from "@mui/material";
import { resetPassword, confirmPassword } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const [emailInputs, setEmailInputs] = useState({
    email: "",
  });

  const [resetInputs, setResetInputs] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const emailHandleChange = (e) => {
    setEmailInputs({ email: e.target.value });
  };

  const emailHandleSubmit = async (e) => {
    e.preventDefault();

    if (emailInputs.email === "") {
      toast.warning("Email field must be filled.");
      return;
    }

    resetPassword(emailInputs).then((res) => {
      setIsEmailSent(true);
      sessionStorage.setItem("email", emailInputs.email);
    });
  };

  const resetHandleChange = (e) => {
    setResetInputs({ ...resetInputs, [e.target.name]: e.target.value });
  };

  const resetHandleSubmit = async (e) => {
    e.preventDefault();

    for (let field in Object.values(resetInputs)) {
      if (field === "") {
        toast.warning("All fields must be filled.");
        return;
      }
    }

    confirmPassword({ ...resetInputs, email: sessionStorage.email });
    sessionStorage.removeItem("email");
    navigate("/login");
  };

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
