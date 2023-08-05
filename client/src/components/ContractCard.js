import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ContractCard(props) {
  const { id = 'c_1' } = props;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #453df5 0%,#327deba8 100%)',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" className="text__white">
            ContractId: {id}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={'contracts/' + id}
            variant="contained"
            color="info"
          >
            <span className="text__white">See contract details</span>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
