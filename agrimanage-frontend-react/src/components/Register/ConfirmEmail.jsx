import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { confirmEmail } from "../../services/authService";

const ConfirmEmail = ({ email }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code === "") {
      toast.warning("Code field must be filled.");
      return;
    }

    confirmEmail({ code: code, email: email }).then(() => {
      sessionStorage.removeItem("email");
      navigate("/login");
    });
  };

  return (
    <Card className="card" component="form">
      <CardContent>
        <TextField
          required
          sx={{ marginBottom: "10px", width: "100%" }}
          type="text"
          id="code"
          name="code"
          label="Code"
          value={code}
          onChange={handleChange}
        />
      </CardContent>
      <Button className="button" onClick={handleSubmit}>Verify</Button>
    </Card>
  );
};

export default ConfirmEmail;
