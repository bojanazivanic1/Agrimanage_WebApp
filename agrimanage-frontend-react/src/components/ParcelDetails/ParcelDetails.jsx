import { deleteParcel } from "../../services/userService";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Map from "./Map";
import parcelsSlice from "../../store/parcels";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ParcelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parcel = useSelector((state) => {
    return state.parcels.parcels.find((p) => p.id == id);
  });

  const handleDelete = () => {
    deleteParcel(parcel.id).then(() => {
      dispatch(parcelsSlice.actions.removeParcel(parcel.id));
      navigate("/dashboard");
    });
  };

  return (
    <>
      {parcel ? (
        <>
          <Card style={{ maxWidth: "700px" }}>
            <CardContent>
              <Typography>Name: {parcel.name}</Typography>
              <Typography>Number: {parcel.parcelNumber}</Typography>
              <Typography>Size: {parcel.size} ha</Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/update-parcel/` + parcel.id}
              >
                Update
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/add-operation/` + parcel.id}
              >
                Add Operation
              </Button>
              <Button variant="contained" onClick={handleDelete}>
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
      ) : (
        <p>Loading parcel data...</p>
      )}
    </>
  );
};

export default ParcelDetails;
