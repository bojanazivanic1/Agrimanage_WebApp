import { useNavigate, useParams } from "react-router-dom";
import { getParcel, updateParcel } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const UpdateParcel = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    parcelNumber: "",
    size: "",
    confirmPassword: "",
  });
  const { id } = useParams();

  useEffect(() => {
    getParcel(id).then((res) => {
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

    updateParcel({ ...inputs, id: id }).then(() => {
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
          <Button onClick={handleSubmit}>Update</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateParcel;
