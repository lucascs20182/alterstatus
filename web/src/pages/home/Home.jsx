import React from 'react'
import AppBar from '../../components/Appbar/Appbar'

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#094B89',
    },
  },

});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar />
      </div>
    </ThemeProvider>
  )
}