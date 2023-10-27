import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { confirmEmail } from "../../services/authService";
import useForm from "../../hooks/use-form";

const ConfirmEmail = ({ email }) => {
  const navigate = useNavigate();

  const initialInputs = {
    code: "",
  };

  const submitHandler = async (inputs) => {
    confirmEmail({ code: inputs.code, email: email }).then(() => {
      sessionStorage.removeItem("email");
      navigate("/login");
    });
  };

  const { inputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    submitHandler
  );

  return (
    <Card className="card" component="form">
      <CardContent>
        <TextField
          required
          type="text"
          id="code"
          name="code"
          label="Code"
          value={inputs.code}
          onChange={handleChange}
        />
      </CardContent>
      <Button className="button" onClick={handleSubmit}>Verify</Button>
    </Card>
  );
};

export default ConfirmEmail;
