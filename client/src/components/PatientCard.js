import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PatientCard(props) {
  const { name = '', birth = 0, _id = '' } = props;
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #453df5 0%,#327deba8 100%)',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" className="text__white">
            Name: {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} className="text__white">
            Age: {birth}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate(_id, {
                state: { patient: props },
              });
            }}
            variant="contained"
            color="info"
          >
            <span className="text__white">See patient details</span>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
