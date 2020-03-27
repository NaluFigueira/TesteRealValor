import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4452A8', contrastText: '#fff' },
    secondary: { main: '#ffc947', contrastText: '#fff' },
    text: {
      primary: '#ffffff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
