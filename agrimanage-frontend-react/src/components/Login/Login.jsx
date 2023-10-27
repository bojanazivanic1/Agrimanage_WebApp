import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authService";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
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

    login(inputs).then((res) => {
      navigate("/dashboard");
    });
  };

  return (
    <>
      <Card component="form">
        <CardContent>
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
            type="password"
            id="password"
            name="password"
            label="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </CardContent>
        <Button onClick={handleSubmit}>Login</Button>
      </Card>
      <Typography marginTop="20px" color="gray">
        You forgot the password? <Link to="/reset-password">Reset here.</Link>
      </Typography>
    </>
  );
};

export default Login;
