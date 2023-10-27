import { TextField } from "@mui/material";

const CoordinateInput = ({ labelX, labelY, valueX, valueY, onChangeX, onChangeY }) => {

  return (
    <div className="coordinate-input">
      <TextField
        variant="outlined"
        label={labelX}
        size="small"
        value={valueX}
        onChange={onChangeX}
      />
      <TextField sx={{marginLeft: "10px"}}
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
