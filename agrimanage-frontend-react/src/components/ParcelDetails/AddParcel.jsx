import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/use-form";
import { addParcel } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { getUserId } from "../../util/auth";

const AddParcel = () => {
  const navigate = useNavigate();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      name: "",
      parcelNumber: "",
      size: "",
      confirmPassword: "",
    },
    async (formData) => {
      addParcel({ ...formData, id: getUserId() }).then(() => {
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
            id="parcelNumber"
            name="parcelNumber"
            label="Parcel Number"
            value={inputs.parcelNumber}
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ marginBottom: "10px", width: "100%" }}
            type="text"
            id="size"
            name="size"
            label="Size"
            value={inputs.size}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Add Parcel</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddParcel;
