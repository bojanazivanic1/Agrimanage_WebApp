import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from "react";
import { getParcel, updateParcel } from "../../services/userService";
import { Button, Card, CardContent, TextField } from "@mui/material";
import Map from "./Map";
import CoordinateInput from "./CoordinateInput";

var temp = -1;

const UpdateParcel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    getParcel(id).then((parcel) => {
      if (parcel) {
        setInputs({
          name: parcel.name,
          parcelNumber: parcel.parcelNumber,
          coordinates: parcel.coordinates,
        });
      }
    });
  }, [id]);

  const map = useMemo(() => {
    return <Map coordinates={inputs.coordinate} polygon={false} />;
  }, [inputs.coordinates]);

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

  const handleEdit = (e) => {
    e.preventDefault();

    const coordinates = inputs.coordinates.map((coord) => ({
      x: parseFloat(coord.x),
      y: parseFloat(coord.y),
    }));

    const parcelData = {
      id: id,
      name: inputs.name,
      parcelNumber: parseInt(inputs.parcelNumber, 10),
      coordinates,
    };

    updateParcel(parcelData).then(() => {
      navigate("/dashboard");
      window.location.reload();
    });
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
          <Button className="button" onClick={resetCoordinates}>
            Reset Coordinates
          </Button>
          <Card sx={{ width: "700px" }}>
            <Map map={map} ref={mapRef} onClick={handleMapClick} />
          </Card>
          <Button className="button" onClick={handleEdit}>
            Edit Parcel
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateParcel;
