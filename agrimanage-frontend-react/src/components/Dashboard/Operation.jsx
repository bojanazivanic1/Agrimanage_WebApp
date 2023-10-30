import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteOperation } from "../../services/userService";

const Operation = (props) => {
  const handleDelete = () => {
    deleteOperation(props.id).then(window.location.reload());
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          {props.parcelName}
        </Typography>
        <Typography>{props.name}</Typography>
      </CardContent>
      <Box>
        <Card className="card">
          <CardContent>
            <Typography>{props.description}</Typography>
          </CardContent>
        </Card>
      </Box>
      <ButtonGroup className="button-group">
        <Button
          className="button"
          variant="contained"
          size="small"
          disableRipple
          disableElevation
          component={RouterLink}
          to={`/update-operation/` + props.id}
        >
          Update
        </Button>
        <Button
          className="button"
          variant="contained"
          size="small"
          disableRipple
          disableElevation
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default Operation;
