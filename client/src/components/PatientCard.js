import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PatientCard (props) {
  const { name = 'Patient', age = 100, id = 0 } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Age: {age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={'patients/' + id}>
          See patient details
        </Button>
      </CardActions>
    </Card>
  );
}
