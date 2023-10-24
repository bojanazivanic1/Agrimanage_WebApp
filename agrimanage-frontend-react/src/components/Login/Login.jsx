import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/use-form";
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
  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    async (formData) => {
      await login(formData).then(() => {
        navigate("/dashboard");
      });
    }
  );

  return (
    <>
      <Card component="form">
        <CardContent>
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
      <Typography marginTop="20px">
        You forgot password? <Link to="/reset-password">Reset here.</Link>
      </Typography>
    </>
  );
};

export default Login;
