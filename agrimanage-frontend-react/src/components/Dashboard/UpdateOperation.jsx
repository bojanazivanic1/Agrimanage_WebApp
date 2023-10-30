import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
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

  const submitHandler = async () => {
    updateOperation({ ...inputs, id: id }).then(() => {
      navigate("/dashboard");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

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
          <Button className="button" onClick={submitHandler}>
            Update
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateOperation;
