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
import { isAuthenticated } from "../../util/auth";
import { logout } from "../../services/authService";
import { useEffect, useState } from "react";
import { getParcels } from "../../services/userService";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getParcels().then((res) => {
      if (res != null) {
        setParcels(res);
      }
    });
  }, []);

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

  return (
    <AppBar className="navbar">
      <Container>
        <Toolbar>
          <Box>
            {isAuthenticated() ? (
              <>
                <Button
                  className="button"
                  variant="contained"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
                <Button
                 className="button"
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
                      className="menu-item"
                        key={parcel.id}
                        component={RouterLink}
                        to={`/parcel/${parcel.id}`}
                      >
                        {parcel.name}
                      </MenuItem>
                    ))}
                </Menu>
                <Button
                 className="button"
                  variant="contained"
                  component={RouterLink}
                  to="/dashboard"
                >
                  Home
                </Button>
                <Button
                 className="button"
                  variant="contained"
                  component={RouterLink}
                  to="/add-parcel"
                >
                  Add Parcel
                </Button>
              </>
            ) : (
              <>
                <Button
                 className="button"
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Button>
                <Button
                 className="button"
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                >
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
