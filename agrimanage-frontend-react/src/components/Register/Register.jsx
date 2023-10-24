import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmEmail from "./ConfirmEmail";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { register } from "../../services/authService";

const Register = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    dateOfBirth: "",
    farmName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let field in Object.values(inputs)) {
      if (field === "") {
        toast.warning("All fields must be filled.");
        return;
      }
    }

    register(inputs).then(() => {
      setIsEmailSent(true);
      sessionStorage.setItem("email", inputs.email);
    });
  };

  return (
    <>
      {!isEmailSent ? (
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
