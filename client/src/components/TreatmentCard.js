import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TreatmentCard(props) {
  const { treatment } = props;
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
            TreatmentId: {treatment._id}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => {
              navigate('/treatments/' + treatment._id, {
                state: { treatment: treatment },
              });
            }}
          >
            <span className="text__white">See treatment details</span>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
