import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import useForm from "../../hooks/use-form"; 
import { addOperation } from "../../services/userService";

const AddOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialInputs = {
    name: "",
    description: "",
  };

  const submitHandler = async (inputs) => {
    addOperation({ ...inputs, parcelId: id }).then(() => {
      navigate("/parcel/" + id);
    });
  };

  const { inputs, handleChange, handleSubmit } = useForm(initialInputs, submitHandler);

  return (
    <>
      <Card className="card" component="form">
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
            id="description"
            name="description"
            label="Description"
            value={inputs.description}
            onChange={handleChange}
          />
          <Button className="button" onClick={handleSubmit}>Add Operation</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddOperation;
