import { useEffect, useState } from "react";
import { getParcel } from "../../services/userService";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Map from "./Map";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const coordinates = [
  [45.245413, 19.848590],
  [45.245783, 19.849771],
  [45.244986, 19.850136],
  [45.244627, 19.849100],
];

const ParcelDetails = () => {
  const [parcel, setParcel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getParcel(id).then((res) => {
      setParcel(res);
    });
  }, []);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography>{parcel.name}</Typography>
          <Typography>{parcel.parcelNumber}</Typography>
          <Typography>{parcel.size}</Typography>
          <Typography>{parcel.ownerId}</Typography>
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
        </CardContent>
      </Card>
      <Card sx={{ width: "1200px", height: "" }}>
        <Map coordinates={coordinates} />
      </Card>
    </>
  );
};

export default ParcelDetails;
