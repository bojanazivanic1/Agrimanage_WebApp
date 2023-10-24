import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Operation = (props) => {
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
    </Card>
  );
};

export default Operation;
