import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, MantineThemeOverride } from '@mantine/core';

// Define the theme with the appropriate type
const theme: MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
});

const rootElement = document.getElementById('root');

// Ensure rootElement is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <MantineProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MantineProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
