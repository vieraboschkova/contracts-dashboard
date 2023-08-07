import { useEffect, useState } from 'react';

import NewContractModal from '../../modals/NewContractModal';
import ContractCard from '../../components/ContractCard';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinearProgress from '@mui/material/LinearProgress';

const initialFetchState = {
  done: false,
  loading: false,
};

function Contracts() {
  const [openNewContract, setOpenNewContract] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [fetchState, setFetchState] = useState({ ...initialFetchState });

  useEffect(() => {
    // React-query/ react-router?
    const fetchContracts = async () => {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const contracts = await fetch('/api/contracts');
        if (contracts.status !== 200)
          throw Error({ message: contracts.statusText });
        const contractsJSON = await contracts.json();
        if (contractsJSON) {
          setContracts(contractsJSON);
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Error Fetching Contracts' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
      }
    };
    fetchContracts();

    return () => {
      setContracts([]);
      setFetchState({ ...initialFetchState });
    };
  }, []);

  return (
    <>
      <div className="container">
        <Grid sx={{ mb: '2rem' }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" gutterBottom>
              Contracts
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              startIcon={<PersonAddIcon />}
              onClick={() => setOpenNewContract(true)}
              variant="contained"
              color="info"
            >
              <span className="text__white">Add new contract</span>
            </Button>
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
              {contracts.map((contract) => {
                return <ContractCard key={contract._id} contract={contract} />;
              })}
            </Grid>
          </Box>
        )}
      </div>
      {openNewContract && (
        <NewContractModal
          setOpenNewContract={setOpenNewContract}
          openNewContract={openNewContract}
          setContracts={setContracts}
        />
      )}
    </>
  );
}

export default Contracts;
