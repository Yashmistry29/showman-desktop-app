import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#265CFF',
    },
    text: {
      secondary: '#6c757d'
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // Add responsive typography if needed
  }
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
