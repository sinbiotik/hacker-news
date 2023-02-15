import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import {Route, Routes} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { PublocationPage } from './pages/PublocationPage';

function App() {
  return (    
    <Routes>
      <Route path='/' element={ <HomePage/> } />        
      <Route path='/about/:id' element={ <PublocationPage /> } />
    </Routes>    
  );
}

export default App;
