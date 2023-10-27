import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import useForm from "../../hooks/use-form";
import { login } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const initialInputs = {
    email: "",
    password: "",
  };

  const submitHandler = async (inputs) => {
    login(inputs).then((res) => {
      navigate("/dashboard");
    });
  };

  const { inputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    submitHandler
  );

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
