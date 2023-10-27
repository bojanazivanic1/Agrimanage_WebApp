import { useEffect, useState } from "react";
import { deleteParcel, getParcel } from "../../services/userService";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Map from "./Map";
import parcelsSlice from "../../store/parcels";
import { useDispatch } from "react-redux";

const coordinates = [
  [45.245413, 19.848595],
  [45.245783, 19.849771],
  [45.244986, 19.850136],
  [45.244627, 19.849187],

  [45.252708, 19.855348],
];

const ParcelDetails = () => {
  const [parcel, setParcel] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteParcel(parcel.id).then(() => {
      dispatch(parcelsSlice.actions.removeParcel(parcel.id));
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    getParcel(id).then((res) => {
      res.coordinates = [
        [res.coordinates[0].x, res.coordinates[0].y],
        [res.coordinates[1].x, res.coordinates[1].y],
        [res.coordinates[2].x, res.coordinates[2].y],
        [res.coordinates[3].x, res.coordinates[3].y],
      ];
      setParcel(res);
    });
  }, []);

  return (
    <>
      <Card className="card">
        <CardContent>
          <Typography>Name: {parcel.name}</Typography>
          <Typography>Number: {parcel.parcelNumber}</Typography>
          <Typography>Size: {parcel.size} ha</Typography>
          <Button
            variant="contained"
            className="button"
            component={RouterLink}
            to={`/update-parcel/` + parcel.id}
          >
            Update
          </Button>
          <Button
            variant="contained"
            className="button"
            component={RouterLink}
            to={`/add-operation/` + parcel.id}
          >
            Add Operation
          </Button>
          <Button variant="contained" className="button" onClick={handleDelete}>
            Delete
          </Button>
        </CardContent>
      </Card>
      <Card sx={{ width: "700px" }}>
        {parcel.coordinates ? (
          <Map coordinates={parcel.coordinates} polygon={true} />
        ) : (
          <p>Loading coordinates...</p>
        )}
      </Card>
    </>
  );
};

export default ParcelDetails;
