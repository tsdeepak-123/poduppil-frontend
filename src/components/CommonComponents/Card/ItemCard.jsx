import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function ItemCard({classes,name,discription,navigation}) {
  const navigate=useNavigate()
  return (
    <Card sx={{ maxWidth: 345 }} className={classes}>
    <CardActionArea>
      {/* <CardMedia
        component="img"
        image="/Images/Labour.jpg"
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" onClick={navigation} >
        VIEW
      </Button>
    </CardActions>
  </Card>
  )
}

export default ItemCard
