import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContractCard from '../../components/ContractCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Patient() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  // TODO: Get from location state or fetch
  const handleError = () => {
    navigate('/patients');
  };

  useEffect(() => {
    const fetchPatientData = async () => {
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
        } else {
          handleError();
        }
      } catch (error) {
        handleError();
      }
    };
    if (location?.state?.patient) {
      // setPatient({ ...location.state.patient });
      fetchPatientData();
    } else {
      fetchPatientData();
    }

    return () => {
      setPatient({});
    };
  }, []);

  return (
    <div className="container">
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
        <Grid container spacing={2} sx={{ m: '-1rem' }} justifyContent="center">
          {patient?.contracts &&
            patient.contracts.map((contract) => {
              return <ContractCard key={contract._id} contract={contract} />;
            })}
        </Grid>
      </Box>
    </div>
  );
}

export default Patient;
