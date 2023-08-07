import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const initalPatientData = { name: '', birth: 2000, stage: 0 };
const initialSubmitState = {
  done: false,
  loading: false,
};
export default function NewPatientModal(props) {
  const { setOpenNewPatient, openNewPatient, setPatients } = props;
  const [data, setData] = useState({ ...initalPatientData });
  const [incorrectData, setIncorrectData] = useState(false);
  const [submitState, setSubmitState] = useState({ ...initialSubmitState });

  const handleDataChange = (event, field) => {
    if (incorrectData) setIncorrectData(false);
    setData((prev) => {
      return { ...prev, [field]: event.target.value };
    });
  };

  const handleSubmit = async () => {
    // TODO: validation
    if (data.name.trim().length < 2) {
      setIncorrectData(true);
      return;
    }
    setSubmitState((prev) => {
      return { ...prev, loading: true };
    });
    try {
      // FEtch
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      };
      const patientRes = await fetch('/api/patients', requestOptions);
      const patientJSON = await patientRes.json();
      setPatients((prev) => [...prev, { ...patientJSON.patient }]);
      setSubmitState({ done: true, success: true, loading: false });

      setTimeout(() => {
        setData({ ...initalPatientData });
        setSubmitState({ ...initialSubmitState });
        setOpenNewPatient(false);
      }, 5000);
    } catch (error) {
      setSubmitState({ done: true, success: false, loading: false });
      setTimeout(() => {
        setSubmitState({ ...initialSubmitState });
      }, 5000);
    }
  };

  return (
    <Dialog open={openNewPatient} onClose={() => setOpenNewPatient(false)}>
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete the form to add a new patient
        </DialogContentText>
        <TextField
          error={incorrectData}
          autoFocus
          required
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={data.name}
          onChange={(event) => handleDataChange(event, 'name')}
          placeholder="Enter patient's name"
          minLength="2"
        />
        <TextField
          required
          margin="dense"
          id="birth"
          label="Birth year"
          type="number"
          fullWidth
          variant="standard"
          value={data.birth}
          onChange={(event) => handleDataChange(event, 'birth')}
        />
        <TextField
          error={data.stage > 5}
          required
          margin="dense"
          id="stage"
          label="Disease Stage"
          type="number"
          fullWidth
          variant="standard"
          value={data.stage}
          onChange={(event) => handleDataChange(event, 'stage')}
        />
        {submitState.loading && (
          <Box sx={{ width: '100%', mt: '1rem' }}>
            <LinearProgress />
          </Box>
        )}
        {submitState.done && (
          <Alert
            severity={submitState.success ? 'success' : 'error'}
            sx={{ mt: '1rem' }}
          >
            <AlertTitle>{submitState.success ? 'Success' : 'error'}</AlertTitle>
            {submitState.success
              ? 'New patient was successfully added'
              : 'Something went wrong. Try again later'}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenNewPatient(false)}>Cancel</Button>
        <Button
          disabled={submitState.loading || submitState.success}
          onClick={handleSubmit}
        >
          Add Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
}
