import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import checkPatientsEligibility from './services/checkPatientsEligibility';

const initalContractData = {
  name: '',
  treatment: '',
  patient: '',
  OSPercentage: 0,
  noOSPercentage: 0,
  OSMaxTimeInMonths: 0,
  PSFPercentage: 0,
  noPSFPercentage: 0,
  PSFMaxTimeInMonths: 0,
  start: new Date().valueOf(),
};
const initialSubmitState = {
  done: false,
  loading: false,
};

const contractFields = [
  'OSPercentage',
  'noOSPercentage',
  'OSMaxTimeInMonths',
  'PSFPercentage',
  'noPSFPercentage',
  'PSFMaxTimeInMonths',
];
export default function NewContractModal(props) {
  const { setOpenNewContract, openNewContract, setContracts } = props;
  const [data, setData] = useState({ ...initalContractData });
  const [elligible, setElligible] = useState(true);
  const [submitState, setSubmitState] = useState({ ...initialSubmitState });
  const [fetchState, setFetchState] = useState({ ...initialSubmitState });
  const [treatments, setTreatments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicinals, setMedicinals] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setFetchState((prev) => {
          return { ...prev, loading: true };
        });
        const patientsRes = await fetch('/api/patients');
        const treatmentsRes = await fetch('/api/treatments');
        const medicinalsRes = await fetch('/api/medicinals');
        if (
          patientsRes.status !== 200 ||
          treatmentsRes.status !== 200 ||
          medicinalsRes.status !== 200
        )
          throw Error({ message: patientsRes.statusText });
        const patientsJSON = await patientsRes.json();
        const treatmentsJSON = await treatmentsRes.json();
        const medicinalsJSON = await medicinalsRes.json();

        if (patientsJSON && treatmentsJSON && medicinalsJSON) {
          setPatients([...patientsJSON]);
          setTreatments([...treatmentsJSON]);
          setMedicinals([...medicinalsJSON]);
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Could not fetch necessary data' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
      }
    };

    fetchPatientData();

    return () => {
      setPatients([]);
      setTreatments([]);
      setSubmitState({ ...initialSubmitState });
      setFetchState({ ...initialSubmitState });
    };
  }, []);

  const handleDataChange = (event, field) => {
    if (!elligible) setElligible(true);
    if (submitState.success === false)
      setSubmitState((prev) => {
        return {
          ...prev,
          success: null,
        };
      });
    setData((prev) => {
      return { ...prev, [field]: event.target.value };
    });
  };

  const handleSubmit = async () => {
    setSubmitState((prev) => {
      return { ...prev, loading: true };
    });

    const patient = patients.find(({ _id }) => _id === data.patient);
    const treatment = treatments.find(({ _id }) => _id === data.treatment);
    const passedCriteria =
      patient && treatment && checkPatientsEligibility(patient, treatment);

    if (!passedCriteria) {
      setElligible(false);
      setSubmitState((prev) => {
        return { ...prev, loading: false };
      });
      return;
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      };
      const contractRes = await fetch('/api/contracts', requestOptions);
      const contractJSON = await contractRes.json();
      setContracts((prev) => [...prev, { ...contractJSON.contract }]);
      setSubmitState({ done: true, success: true, loading: false });

      setTimeout(() => {
        setData({ ...initalContractData });
        setSubmitState({ ...initialSubmitState });
        setOpenNewContract(false);
      }, 5000);
    } catch (error) {
      setSubmitState({ done: true, success: false, loading: false });
      setTimeout(() => {
        setSubmitState({ ...initialSubmitState });
      }, 5000);
    }
  };

  return (
    <Dialog
      open={openNewContract}
      onClose={() => setOpenNewContract(false)}
      fullScreen
    >
      <DialogTitle>
        <span>Add New Contract</span>{' '}
        <IconButton
          aria-label="close"
          onClick={() => setOpenNewContract(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
          <DialogContent>
            <DialogContentText>
              Complete the form to add a new contract
            </DialogContentText>
            {patients.length > 0 && (
              <Box sx={{ minWidth: 120, mb: '1rem', mt: '1rem' }}>
                <FormControl fullWidth>
                  <InputLabel id="select-patient">Patients Name</InputLabel>
                  <Select
                    autoFocus
                    labelId="select-patient"
                    id="select-patient"
                    value={data.patient}
                    label="Choose Patient"
                    onChange={(event) => handleDataChange(event, 'patient')}
                  >
                    {patients.map((patient) => {
                      return (
                        <MenuItem key={patient._id} value={patient._id}>
                          {patient.name}, {patient.birth}, stage:{' '}
                          {patient.stage}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            )}
            {treatments.length > 0 && medicinals.length > 0 && (
              <Box sx={{ minWidth: 120, mb: '1rem' }}>
                <FormControl fullWidth>
                  <InputLabel id="select-treatment">Treatments Name</InputLabel>
                  <Select
                    labelId="select-treatment"
                    id="select-treatment"
                    value={data.treatment}
                    label="Choose Treatment"
                    onChange={(event) => handleDataChange(event, 'treatment')}
                  >
                    {treatments.map((treatment) => {
                      const medicinal = medicinals.find(
                        ({ _id }) => _id === treatment.medicinal,
                      );
                      return (
                        <MenuItem value={treatment._id} key={treatment._id}>
                          {treatment.name}, maxAge: {treatment.maxAge},
                          maxStage: {treatment.maxStage},{medicinal.name},{' '}
                          {medicinal.dosage}, {medicinal.units} units, price:{' '}
                          {medicinal.priceInCHF}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            )}
            {!elligible && (
              <Alert severity="error">
                Not passing criteria. Change patient or treatment
              </Alert>
            )}
            {contractFields.map((field) => (
              <FormControl fullWidth key={field}>
                <TextField
                  required
                  margin="dense"
                  id={field}
                  label={field}
                  type="number"
                  // TODO: add validation
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                  fullWidth
                  variant="standard"
                  value={data[field]}
                  onChange={(event) => handleDataChange(event, field)}
                  placeholder={"Enter contract's " + field}
                />
              </FormControl>
            ))}
            <Box sx={{ mt: '1rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose a start date"
                  value={dayjs(data.start)}
                  onChange={(newValue) =>
                    setData((prev) => {
                      return { ...prev, start: newValue.valueOf() };
                    })
                  }
                />
              </LocalizationProvider>
            </Box>
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
                <AlertTitle>
                  {submitState.success ? 'Success' : 'error'}
                </AlertTitle>
                {submitState.success
                  ? 'New contract was successfully added'
                  : 'Something went wrong. Try again later'}
              </Alert>
            )}
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={() => setOpenNewContract(false)}>Cancel</Button>
        {fetchState.success && (
          <Button
            disabled={submitState.loading || submitState.success}
            onClick={handleSubmit}
          >
            Add Contract
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
