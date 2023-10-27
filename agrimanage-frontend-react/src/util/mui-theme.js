import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#d84312",
          textTransform: "none",
          fontSize: "1rem",
          borderRadius: "8px",
          maxWidth: "150px",
          color: "white",
          margin: "10px",
          "&:hover": {
            backgroundColor: "#f4511e",
            color: "white",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "fixed",
          backgroundColor: "#3f3f3e",
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#c0bab9",
          "&:hover": {
            color: "#772a10",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          padding: "10px",
          backgroundColor: "#c3c0bf",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "white",
            color: "#d84312",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "10px",
          width: "100%",
          "&:focus": {
            border: "2px solid #d84312",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});
