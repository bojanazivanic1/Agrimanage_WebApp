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
    <AppBar>
      <Container>
        <Toolbar>
          <Box>
            {isAuthenticated() ? (
              <>
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
                        component={RouterLink}
                        to={`/parcel/${parcel.id}`}
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
                <Button
                  sx={{ marginLeft: 2 }}
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
