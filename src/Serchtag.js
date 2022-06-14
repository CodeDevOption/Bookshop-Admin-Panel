import { Delete } from '@mui/icons-material';
import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './Searchtag.css'
import { useStateValue } from './StateProvider'
function Searchtag({name,id}) {
  const[{Searchtag},dispatch] = useStateValue();
  
  const removetag = ()=>{
      dispatch({
        type:"Remove_tag",
        id:id,
        
      })
  }
  return (
     <ListItem
        secondaryAction={
          <IconButton onClick={removetag} edge="end" aria-label="delete">
          <Delete />
          </IconButton>
        }
      >      
      <ListItemText primary={name} />
    </ListItem>
)}

export default Searchtag