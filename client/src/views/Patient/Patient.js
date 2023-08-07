import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContractCard from '../../components/ContractCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

const initialFetchState = {
  done: false,
  loading: false,
};

function Patient() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  const [fetchState, setFetchState] = useState({ ...initialFetchState });

  const navigate = useNavigate();

  const handleError = () => {
    navigate('/patients');
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const patientRes = await fetch('/api/patients/' + patientId);
        const contractsRes = await fetch(
          '/api/contracts/byPatientId/' + patientId,
        );
        if (patientRes.status !== 200 || contractsRes.status !== 200)
          throw Error({ message: patientRes.statusText });
        const patientJSON = await patientRes.json();
        const contractsJSON = await contractsRes.json();

        if (patientJSON && contractsJSON) {
          setPatient({ ...patientJSON, contracts: [...contractsJSON] });
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Could not fetch patients data' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
        handleError();
      }
    };

    fetchPatientData();

    return () => {
      setPatient({});
      setFetchState({ ...initialFetchState });
    };
  }, []);

  return (
    <div className="container">
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
        <>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #453df5 0%,#327deba8 100%)',
              mb: '2rem',
            }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom className="text__white">
                Name: {patient.name}
              </Typography>
              <hr></hr>
              <Typography variant="div" gutterBottom className="text__white">
                Birth: {patient.birth}
              </Typography>
              <hr></hr>
              <Typography variant="div" gutterBottom className="text__white">
                Stage: {patient.stage}
              </Typography>
              <hr></hr>
              <Typography variant="div" gutterBottom className="text__white">
                Patient Id: {patient._id}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ m: '-1rem' }}>
              {patient?.contracts &&
                patient.contracts.map((contract) => {
                  return (
                    <ContractCard key={contract._id} contract={contract} />
                  );
                })}
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}

export default Patient;
