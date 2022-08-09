import {forwardRef} from 'react'; // https://github.com/joshwcomeau/react-flip-move#usage-with-functional-components
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from '@mui/material';
import {MdDelete, MdOutlineUpdate} from 'react-icons/md';

const _Item = (
  {thumbnail, name, paragraph, handleDelete, handleUpdate, refId},
  ref
) => {
  return (
    <Card sx={{maxWidth: 300}} ref={ref}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {paragraph}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={(e) => {
            handleUpdate(e, {refId});
          }}
        >
          <MdOutlineUpdate size={40} />
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            handleDelete(e, {refId});
          }}
        >
          <MdDelete size={40} />
        </Button>
      </CardActions>
    </Card>
  );
};

const Item = forwardRef(_Item);

export {Item};
