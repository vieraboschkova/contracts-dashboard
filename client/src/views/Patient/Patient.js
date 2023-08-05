import { useEffect, useState } from 'react';
import { 
  // useNavigate, 
  useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import mockPatients from '../../mock/patients.mock';
import ContractCard from '../../components/ContractCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Patient() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState({});
  // const navigate = useNavigate();
  // Get from location state or fetch
  useEffect(() => {
    //
    const fetchPatient = async () => {
      try {
        const patient = await fetch('/api/patients/' + patientId);
        const patientJSON = await patient.json();
        console.log(patientJSON);
        if (patientJSON) {
          setPatient(patientJSON);
        } else {
          const patient = mockPatients.find(
            (patient) => patient.id === patientId,
          );
          setPatient(patient ? patient : mockPatients[0]);
          // OR
          // if (!patient) {
          //   navigate('/patients');
          // }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatient();

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
          <Typography variant="div" gutterBottom className="text__white">
            Birth: {patient.birth}
            <br />
            Stage: {patient.stage}
            <br />
            Patient Id: {patient._id}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ m: '-1rem' }} justifyContent="center">
          {patient?.contracts &&
            patient.contracts.map((contractId) => {
              return <ContractCard key={contractId} id={contractId} />;
            })}
        </Grid>
      </Box>
    </div>
  );
}

export default Patient;
