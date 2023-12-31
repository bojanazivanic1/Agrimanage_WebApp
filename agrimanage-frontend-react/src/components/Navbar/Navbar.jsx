import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getFarmName, isAuthenticated } from "../../util/auth";
import { logout } from "../../services/authService";
import { useEffect, useState } from "react";
import { getParcels } from "../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import parcelsSlice from "../../store/parcels";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parcels = useSelector((state) => state.parcels.parcels);

  useEffect(() => {
    if (isAuthenticated()) {
      getParcels().then((res) => {
        dispatch(parcelsSlice.actions.setParcels(res));
      });
    }
  }, [isAuthenticated()]);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (parcelId) => {
    setAnchorEl(null);
    navigate(`/parcel/${parcelId}`);
    window.location.reload();
  };

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {isAuthenticated() ? (
              <>
                <div>
                  <Button variant="contained" onClick={logoutHandler}>
                    Logout
                  </Button>
                  <Button
                    variant="contained"
                    aria-controls="parcels-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                  >
                    Parcels
                  </Button>
                  <Menu
                    id="parcels-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {parcels &&
                      parcels.map((parcel) => (
                        <MenuItem
                          key={parcel.id}
                          onClick={() => handleMenuItemClick(parcel.id)}
                        >
                          {parcel.name}
                        </MenuItem>
                      ))}
                  </Menu>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/dashboard"
                  >
                    Home
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/add-parcel"
                  >
                    Add Parcel
                  </Button>
                </div>
                <p style={{ marginLeft: "auto" }}>{getFarmName()}</p>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Button>
                <Button variant="contained" component={RouterLink} to="/login">
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
