import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const initialFetchState = {
  done: false,
  loading: false,
};

function Treatment() {
  const { treatmentId } = useParams();
  const [treatment, setTreatment] = useState({});
  const [medicinal, setMedicinal] = useState({});

  const [fetchState, setFetchState] = useState({ ...initialFetchState });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTreatmentData = async () => {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const treatmentRes = await fetch('/api/treatments/' + treatmentId);
        if (treatmentRes.status !== 200)
          throw Error({ message: treatmentRes.statusText });
        const treatmentJSON = await treatmentRes.json();

        if (treatmentJSON) {
          setTreatment(treatmentJSON);
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Could not fetch treatment' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
      }
    };
    if (location?.state?.treatment) {
      setTreatment({ ...location.state.treatment });
      setFetchState({ done: true, success: true, loading: false });
    } else {
      fetchTreatmentData();
    }

    return () => {
      setTreatment({});
      setFetchState({ ...initialFetchState });
    };
  }, []);

  const handleGoToTreatments = () => {
    navigate('/treatments');
  };

  const handleShowMedicinalDetails = async () => {
    try {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });

      const medicinalRes = await fetch(
        '/api/medicinals/' + treatment.medicinal,
      );
      if (medicinalRes.status !== 200)
        throw Error({ message: medicinalRes.statusText });

      const medicinalJSON = await medicinalRes.json();

      if (medicinalJSON) {
        setMedicinal({ ...medicinalJSON });
        setFetchState({ done: true, success: true, loading: false });
      } else {
        throw Error({ message: 'Could not fetch necessary data' });
      }
    } catch (error) {
      setFetchState({ done: true, success: false, loading: false });
    }
  };

  return (
    <div className="container">
      <Box sx={{ width: '100%', mb: '1rem' }}>
        <Button
          size="small"
          onClick={handleGoToTreatments}
          variant="contained"
          color="info"
          disabled={fetchState.loading}
        >
          <span className="text__white">Back to Treatments</span>
        </Button>
      </Box>
      <Card
        sx={{
          background: 'linear-gradient(135deg, #453df5 0%,#327deba8 100%)',
          mb: '2rem',
        }}
      >
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
          <CardContent>
            <Typography variant="h4" gutterBottom className="text__white">
              TreatmentId: {treatment._id}
            </Typography>
            <hr></hr>
            <Typography variant="div" gutterBottom className="text__white">
              Max Age: {treatment.maxAge}
            </Typography>
            <hr></hr>
            <Typography variant="div" gutterBottom className="text__white">
              Max Stage: {treatment.maxStage}
            </Typography>
            <hr></hr>

            <Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="div" gutterBottom className="text__white">
                  Medicinal: {treatment.medicinal}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {!medicinal.name ? (
                  <Button
                    size="small"
                    onClick={handleShowMedicinalDetails}
                    variant="contained"
                    color="info"
                    style={{ marginLeft: 'auto' }}
                  >
                    <span className="text__white">Show Medicinal details</span>
                  </Button>
                ) : (
                  <>
                    <p className="text__white">
                      Medicinal Name: {medicinal.name}
                    </p>
                    <p className="text__white">
                      Medicinal Dosage: {medicinal.dosage}
                    </p>
                    <p className="text__white">
                      Medicinal Units: {medicinal.units}
                    </p>
                    <p className="text__white">
                      Medicinal Price in CHF: {medicinal.priceInCHF}
                    </p>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default Treatment;
