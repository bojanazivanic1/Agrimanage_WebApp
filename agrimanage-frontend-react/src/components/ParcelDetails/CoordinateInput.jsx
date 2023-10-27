import { TextField } from "@mui/material";

const CoordinateInput = ({ labelX, labelY, valueX, valueY, onChangeX, onChangeY }) => {
  return (
    <div>
      <TextField
        variant="outlined"
        label={labelX}
        size="small"
        value={valueX}
        onChange={onChangeX}
      />
      <TextField
        variant="outlined"
        label={labelY}
        size="small"
        value={valueY}
        onChange={onChangeY}
      />
    </div>
  );
};

export default CoordinateInput;
