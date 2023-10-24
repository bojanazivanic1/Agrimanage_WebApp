import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/use-form";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { confirmEmail } from "../../services/authService";

const ConfirmEmail = ({ email }) => {
  const navigate = useNavigate();
  const { inputs, handleChange, handleSubmit } = useForm(
    {
      code: "",
    },
    async (formData) => {
      await confirmEmail({ ...formData, email: email }).then(() => {
        sessionStorage.removeItem("email");
        navigate("/login");
      });
    }
  );

  return (
    <Card component="form">
      <CardContent>
        <TextField
          required
          sx={{ marginBottom: "10px", width: "100%" }}
          type="text"
          id="code"
          name="code"
          label="Code"
          value={inputs.code}
          onChange={handleChange}
        />
      </CardContent>
      <Button onClick={handleSubmit}>Verify</Button>
    </Card>
  );
};

export default ConfirmEmail;
