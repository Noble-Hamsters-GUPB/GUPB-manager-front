import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
// @ts-ignore
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#fff59d",
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
