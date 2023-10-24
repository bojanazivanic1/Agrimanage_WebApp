import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addOperation } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";

const AddOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field in Object.values(inputs)) {
      if (field === "") {
        toast.warning("All fields must be filled.");
        return;
      }
    }

    addOperation({ ...inputs, parcelId: id }).then(() => {
      navigate("/parcel/" + id);
    });
  };

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
