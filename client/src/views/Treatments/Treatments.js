import { useEffect, useState } from 'react';
import TreatmentCard from '../../components/TreatmentCard';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const initialFetchState = {
  done: false,
  loading: false,
};

function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [fetchState, setFetchState] = useState({ ...initialFetchState });

  useEffect(() => {
    // React-query/ react-router?
    const fetchTreatments = async () => {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const treatments = await fetch('/api/treatments');
        if (treatments.status !== 200)
          throw Error({ message: treatments.statusText });
        const treatmentsJSON = await treatments.json();
        if (treatmentsJSON) {
          setTreatments(treatmentsJSON);
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Error Fetching Treatments' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
      }
    };
    fetchTreatments();

    return () => {
      setTreatments([]);
      setFetchState({ ...initialFetchState });
    };
  }, []);

  return (
    <>
      <div className="container">
        <Grid sx={{ mb: '2rem' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" gutterBottom>
              Treatments
            </Typography>
          </Grid>
        </Grid>
        {fetchState.loading && (
          <Box sx={{ width: '100%', mt: '1rem' }}>
            <LinearProgress />
          </Box>
        )}
        {fetchState.done && !fetchState.success && (
          <Box sx={{ width: '100%', mt: '1rem' }}>
            <Typography variant="h4" gutterBottom>
              Something went wrong. Reload the page.
            </Typography>
          </Box>
        )}
        {fetchState.success && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ m: '-1rem' }}>
              {treatments.map((treatment) => {
                return (
                  <TreatmentCard key={treatment._id} treatment={treatment} />
                );
              })}
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
}

export default Treatments;
