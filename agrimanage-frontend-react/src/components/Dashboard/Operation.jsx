import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteOperation } from "../../services/userService";

const Operation = (props) => {
  const handleDelete = () => {
    deleteOperation(props.id).then(
      window.location.reload()
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography>{props.name}</Typography>
        <Typography>{props.parcelId}</Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}>
        <Card sx={{ padding: 1 }}>
          <CardContent>
            <Typography>{props.description}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Button
        variant="contained"
        component={RouterLink}
        to={`/update-operation/` + props.id}
      >
        Update
      </Button>
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </Card>
  );
};

export default Operation;
