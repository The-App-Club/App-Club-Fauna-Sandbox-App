import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

const Item = ({thumbnail, name, message, price}) => {
  return (
    <Card sx={{minWidth: 280, maxWidth: 300}}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={thumbnail} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={'1rem'}
            fontWeight={'bold'}
          >
            {message}
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            {`$ ${price}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export {Item};
