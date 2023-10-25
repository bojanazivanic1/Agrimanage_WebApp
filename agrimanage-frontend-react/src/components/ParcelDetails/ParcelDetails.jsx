import { useEffect, useState } from "react";
import { getParcel } from "../../services/userService";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Map from "./Map";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

const coordinates = [
  [45.245413, 19.848595],
  [45.245783, 19.849771],
  [45.244986, 19.850136],
  [45.244627, 19.849187],


  [45.252708, 19.855348]
];

const ParcelDetails = () => {
  const [parcel, setParcel] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getParcel(id).then((res) => {
      console.log(res)
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
      <Card sx={{ width: "1200px" }}>
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
