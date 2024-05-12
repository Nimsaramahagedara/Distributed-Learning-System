import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const CourseCard = ({course}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={ course?.image ? course.image :"https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {course?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Price : {course?.fee}
        </Button>
      </CardActions>
    </CardActionArea>
  </Card>
  )
}

export default CourseCard