import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux'
import store from './redux/store';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#303030',
    },
    background: {
      default: '#303030'
    }
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
, document.getElementById('root'));
