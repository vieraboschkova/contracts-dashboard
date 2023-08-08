import { useState } from 'react';

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

const initialSubmitState = {
  done: false,
  loading: false,
};
export default function UpdateContractModal(props) {
  const { setOpenUpdateContract, openUpdateContract, setContract, contract } =
    props;
  const [data, setData] = useState({ [openUpdateContract]: 1 });
  const [submitState, setSubmitState] = useState({ ...initialSubmitState });

  const handleDataChange = (event, field) => {
    if (submitState.success === false)
      setSubmitState({ ...initialSubmitState });
    setData((prev) => {
      return { ...prev, [field]: event.target.value };
    });
  };

  const handleSubmit = async () => {
    // TODO: validation
    if (
      openUpdateContract === 'progressionMonth' &&
      contract.deathMonth > 0 &&
      data.progressionMonth > contract.deathMonth
    ) {
      setSubmitState({ done: true, success: false, loading: false });
      return;
    }
    setSubmitState((prev) => {
      return { ...prev, loading: true };
    });
    try {
      // FEtch
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      };
      const contractRes = await fetch(
        '/api/contracts/' + contract._id,
        requestOptions,
      );
      const contractJSON = await contractRes.json();
      setContract((prev) => {
        return { ...prev, ...contractJSON.contract };
      });
      setSubmitState({ done: true, success: true, loading: false });

      setTimeout(() => {
        setData({});
        setSubmitState({ ...initialSubmitState });
        setOpenUpdateContract(false);
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
      open={!!openUpdateContract}
      onClose={() => setOpenUpdateContract(false)}
    >
      <DialogTitle>Update Contract</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete the form to update the {openUpdateContract}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id={openUpdateContract}
          label={openUpdateContract}
          type="number"
          fullWidth
          variant="standard"
          value={data[openUpdateContract]}
          onChange={(event) => handleDataChange(event, openUpdateContract)}
          placeholder={'Update' + openUpdateContract}
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
              ? 'New contract was successfully added'
              : 'Something went wrong. Try again later'}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenUpdateContract(false)}>Cancel</Button>
        <Button
          disabled={submitState.loading || submitState.success}
          onClick={handleSubmit}
        >
          Update Contract
        </Button>
      </DialogActions>
    </Dialog>
  );
}
