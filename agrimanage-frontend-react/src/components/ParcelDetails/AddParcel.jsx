import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { addParcel } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { getUserId } from "../../util/auth";
import Map from "./Map";

const AddParcel = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    parcelNumber: "",
    size: "",
    coordinates: [
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
    ],
  });

  const map = useMemo(() => {
    <Map coordinates={{}} polygon={false} />
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("coordinates")) {
      const [index, coordinate] = name.match(/\d+/g);
      const updatedCoordinates = [...inputs.coordinates];
      updatedCoordinates[index][coordinate] = value;
      setInputs((prevInputs) => ({
        ...prevInputs,
        coordinates: updatedCoordinates,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleCoordinatesChange = (e, index, property) => {
    const newInputs = { ...inputs };

    if (property === "x") {
      newInputs.coordinates[index].x = e.target.value;
    } else if (property === "y") {
      newInputs.coordinates[index].y = e.target.value;
    } else {
      newInputs[property] = e.target.value;
    }

    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const coordinates = inputs.coordinates.map((coord) => ({
      x: parseFloat(coord.x),
      y: parseFloat(coord.y),
    }));

    const parcelData = {
      name: inputs.name,
      parcelNumber: parseInt(inputs.parcelNumber, 10),
      size: parseInt(inputs.size, 10),
      coordinates,
    };

    addParcel(parcelData).then(() => {
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
          <br />
          {inputs.coordinates.map((coordinate, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`X ${index + 1}`}
                value={coordinate.x}
                onChange={(e) => handleCoordinatesChange(e, index, "x")}
              />
              <input
                type="text"
                placeholder={`Y ${index + 1}`}
                value={coordinate.y}
                onChange={(e) => handleCoordinatesChange(e, index, "y")}
              />
            </div>
          ))}
          <Card sx={{ width: "1200px" }}>
            <Map map={map} />
          </Card>
          <Button onClick={handleSubmit}>Add Parcel</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddParcel;
