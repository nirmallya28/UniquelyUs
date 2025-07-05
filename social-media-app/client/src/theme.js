import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b39ddb',         // pastel purple (lavender)
      light: '#d1c4e9',        // even lighter lavender
      dark: '#9575cd',         // deeper purple
      contrastText: '#3e3e3e', // soft dark on buttons
    },
    secondary: {
      main: '#ce93d8',         // light magenta-violet
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: '#3e3e3e',
    },
    background: {
      default: '#f8f5fc',      // soft lavender BG
      paper: '#ffffff',        // white card BG
    },
    text: {
      primary: '#2c2c2c',      // dark grey
      secondary: '#5e5e5e',    // medium grey
    },
  },
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          padding: '16px',
          borderWidth: "1.5px",
          borderColor: '#d1c4e9',
          backgroundColor: '#ffffff',
          color: '#2c2c2c',
          boxShadow: '0 4px 12px rgba(179, 157, 219, 0.2)',
          borderRadius: '16px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 16px rgba(149, 117, 205, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '8px 20px',
          fontWeight: 500,
          textTransform: 'none',
          backgroundColor: '#b39ddb',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#9575cd',
          },
        },
        containedPrimary: {
          color: '#fff',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1c4e9',
            },
            '&:hover fieldset': {
              borderColor: '#9575cd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b39ddb',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
