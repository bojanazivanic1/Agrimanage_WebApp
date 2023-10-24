import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/use-form";
import { addOperation } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";

const AddOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { inputs, handleChange, handleSubmit } = useForm(
    {
      name: "",
      description: "",
    },
    async (formData) => {
      addOperation({ ...formData, parcelId: id }).then(() => {
        navigate("/parcel/" + id);
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
            id="description"
            name="description"
            label="Description"
            value={inputs.description}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Add Operation</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddOperation;
