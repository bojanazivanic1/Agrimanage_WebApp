import { useNavigate, useParams } from "react-router-dom";
import { getOperation, updateOperation } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const UpdateOperation = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const { id } = useParams();

  useEffect(() => {
    getOperation(id).then((res) => {
      setInputs(res);
    });
  }, []);

  const handleChange = (e) => {
    let { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateOperation({ ...inputs, id: id }).then(() => {
      navigate("/dashboard");
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
          <Button onClick={handleSubmit}>Update</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateOperation;
