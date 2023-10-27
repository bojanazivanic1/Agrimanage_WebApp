import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import useForm from "../../hooks/use-form";
import { getOperation, updateOperation } from "../../services/userService";
import { useEffect, useState } from "react";

const UpdateOperation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({ name: "", description: "" });

  useEffect(() => {
    getOperation(id).then((res) => {
      setInputs(res);
    });
  }, [id]);

  const submitHandler = async (inputs) => {
    updateOperation({ ...inputs, id: id }).then(() => {
      navigate("/dashboard");
    });
  };

  const { handleChange, handleSubmit } = useForm(inputs, submitHandler);

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
          <Button className="button" onClick={handleSubmit}>
            Update
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateOperation;
