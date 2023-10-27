import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { addParcel } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import Map from "./Map";
import CoordinateInput from "./CoordinateInput";

var temp = 0;

const AddParcel = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    parcelNumber: "",
    coordinates: [
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
    ],
  });
  const mapRef = useRef(null);

  const map = useMemo(() => {
    return <Map polygon={false} />;
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

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;

    setInputs((prevInputs) => {
      const updatedCoordinates = [...prevInputs.coordinates];

      if (temp < updatedCoordinates.length) {
        updatedCoordinates[temp] = { x: lat, y: lng };
      }

      let nextIndex = temp;
      while (
        nextIndex < updatedCoordinates.length &&
        updatedCoordinates[nextIndex].x !== ""
      ) {
        nextIndex++;
      }

      temp = nextIndex;

      return {
        ...prevInputs,
        coordinates: updatedCoordinates,
      };
    });
  };

  const resetCoordinates = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinates: [
        { x: "", y: "" },
        { x: "", y: "" },
        { x: "", y: "" },
        { x: "", y: "" },
      ],
    }));

    temp = 0;
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
      window.location.reload();
    });
  };

  return (
    <>
      <Card className="card" component="form" sx={{ marginTop: "40px" }}>
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
          {inputs.coordinates.map((coordinate, index) => (
            <CoordinateInput
              key={index}
              labelX={`X ${index + 1}`}
              labelY={`Y ${index + 1}`}
              valueX={coordinate.x}
              valueY={coordinate.y}
              onChangeX={(e) => handleCoordinatesChange(e, index, "x")}
              onChangeY={(e) => handleCoordinatesChange(e, index, "y")}
            />
          ))}
          <Button onClick={resetCoordinates}>Reset Coordinates</Button>
          <Card sx={{ width: "700px" }}>
            <Map map={map} ref={mapRef} onClick={handleMapClick} />
          </Card>
          <Button onClick={handleSubmit}>Add Parcel</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddParcel;