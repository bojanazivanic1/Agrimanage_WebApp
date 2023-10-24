import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/use-form";
import { confirmEmail, register } from "../../services/authService";
import { useState } from "react";
import ConfirmEmail from "./ConfirmEmail";
import { Button, Card, CardContent, TextField } from "@mui/material";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const Register = () => {
  const [isEamilSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      name: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      address: "",
      dateOfBirth: "",
      farmName: "",
    },
    async (formData) => {
      await register(formData).then(() => {
        setIsEmailSent(() => true);
        sessionStorage.setItem("email", inputs.email);
      });
    }
  );

  const submitHandlerCode = async (formData) => {
    await confirmEmail({ ...formData, email: sessionStorage.email }).then(
      () => {
        sessionStorage.removeItem("email");
        navigate("/login");
      }
    );
  };

  return (
    <>
      {!isEamilSent ? (
        <Card component="form">
          <CardContent>
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="text"
              id="name"
              name="name"
              label="Name"
              value={inputs.name}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="email"
              id="email"
              name="email"
              label="Email"
              value={inputs.email}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="text"
              id="address"
              name="address"
              label="Address"
              value={inputs.address}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={inputs.dateOfBirth}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="text"
              id="farmName"
              name="farmName"
              label="Farm Name"
              value={inputs.farmName}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="password"
              id="password"
              name="password"
              label="Password"
              value={inputs.password}
              onChange={handleChange}
            />
            <TextField
              required
              sx={{ marginBottom: "10px", width: "100%" }}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </CardContent>
          <Button onClick={handleSubmit}>Register</Button>
        </Card>
      ) : (
        <ConfirmEmail email={inputs.email} />
      )}
    </>
  );
};

export default Register;
