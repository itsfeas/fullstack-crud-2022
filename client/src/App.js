import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import Dashboard from './Dashboard';
import { mainTheme } from './theme';
import { useState } from 'react'
import React, { Component } from 'react';



function App () {
    return (
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Container >
          <Container maxWidth="sm" >
            <Stack >
              <Dashboard theme={mainTheme}/>
            </Stack>
          </Container>
        </Container>
      </ThemeProvider>
    );
}

export default App;