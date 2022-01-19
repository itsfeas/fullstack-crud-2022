import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import Dashboard from './Dashboard';
import { mainTheme } from './theme';
import { useState } from 'react'
import React, { Component } from 'react';



function App () {
  const [page, setPage] = useState("Inventory");
    return (
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Container >
          <Container maxWidth="sm" >
            <Stack >
              {page === "Inventory" && <Dashboard theme={mainTheme}/>}
            </Stack>
          </Container>
        </Container>
      </ThemeProvider>
    );
}

export default App;