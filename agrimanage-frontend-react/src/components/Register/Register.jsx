import { useState } from "react";
import ConfirmEmail from "./ConfirmEmail";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { register } from "../../services/authService";
import useForm from "../../hooks/use-form";

const Register = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const initialInputs = {
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    dateOfBirth: "",
    farmName: "",
  };

  const submitHandler = async (inputs) => {
    register(inputs).then(() => {
      setIsEmailSent(true);
      sessionStorage.setItem("email", inputs.email);
    });
  };

  const { inputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    submitHandler
  );

  return (
    <>
      {!isEmailSent ? (
        <Card style={{ maxWidth: "500px" }} component="form">
          <CardContent>
            <TextField
              required
              type="text"
              id="name"
              name="name"
              label="Name"
              value={inputs.name}
              onChange={handleChange}
            />
            <TextField
              required
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <TextField
              required
              type="email"
              id="email"
              name="email"
              label="Email"
              value={inputs.email}
              onChange={handleChange}
            />
            <TextField
              required
              type="text"
              id="address"
              name="address"
              label="Address"
              value={inputs.address}
              onChange={handleChange}
            />
            <TextField
              required
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={inputs.dateOfBirth}
              onChange={handleChange}
            />
            <TextField
              required
              type="text"
              id="farmName"
              name="farmName"
              label="Farm Name"
              value={inputs.farmName}
              onChange={handleChange}
            />
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              value={inputs.password}
              onChange={handleChange}
            />
            <TextField
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </CardContent>
          <Button className="button" onClick={handleSubmit}>
            Register
          </Button>
        </Card>
      ) : (
        <ConfirmEmail email={inputs.email} />
      )}
    </>
  );
};

export default Register;
