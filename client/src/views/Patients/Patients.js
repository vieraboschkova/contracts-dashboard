import { useEffect, useState } from 'react';

import NewPatientModal from '../../modals/NewPatientModal';

import PatientCard from '../../components/PatientCard';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import mockPatients from '../../mock/patients.mock';

function Patients() {
  const [openNewPatient, setOpenNewPatient] = useState(false);
  const [patients, setPatients] = useState([]);

  // TODO: add loader
  useEffect(() => {
    // React-query/ react-router?
    const fetchPatients = async () => {
      try {
        const patients = await fetch('/api/patients');
        if (patients.status !== 200)
          throw Error({ message: patients.statusText });
        const patientsJSON = await patients.json();
        if (patientsJSON) {
          setPatients(patientsJSON);
        } else {
          setPatients(mockPatients);
        }
      } catch (error) {
        console.log(error);
        // TODO: handle Error
      }
    };
    fetchPatients();

    return () => {
      setPatients([]);
    };
  }, []);

  return (
    <>
      <div className="container">
        <Grid sx={{ mb: '2rem' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" gutterBottom>
              Patients
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              startIcon={<PersonAddIcon />}
              onClick={() => setOpenNewPatient(true)}
              variant="contained"
              color="info"
            >
              <span className="text__white">Add new patient</span>
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ m: '-1rem' }}
            justifyContent="center"
          >
            {patients.map(({ name, birth, _id, stage }) => {
              return (
                <PatientCard
                  key={_id}
                  name={name}
                  birth={birth}
                  _id={_id}
                  stage={stage}
                />
              );
            })}
          </Grid>
        </Box>
      </div>
      <NewPatientModal
        setOpenNewPatient={setOpenNewPatient}
        openNewPatient={openNewPatient}
        setPatients={setPatients}
      />
    </>
  );
}

export default Patients;
