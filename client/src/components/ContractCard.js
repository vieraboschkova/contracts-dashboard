import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ContractCard(props) {
  const { contract } = props;
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
            ContractId: {contract._id}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => {
              navigate('/contracts/' + contract._id, {
                state: { contract: contract },
              });
            }}
          >
            <span className="text__white">See contract details</span>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
