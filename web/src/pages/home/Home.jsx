import React from 'react'
import { useState } from 'react';
import AppBar from '../../components/Appbar/Appbar'

import { Switch } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',

      },
      secondary: {
        main: '#094B89',
        dark: 'D6D6D6',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      background: {
        default: "#333",
      },
      primary: {
        main: '#333',
      },
      secondary: {
        main: '#fff',
        dark: '3A3A3A',
      },
      type: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <AppBar />
        <FormControlLabel style={{marginLeft: 10}}
        control={<Switch id="Modo dark" name="Modo-Dark-Switch" className="Modo-Dark-Switch" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />   }
        label="Modo Dark"
      />
      </ThemeProvider>
    </div>
  )
}