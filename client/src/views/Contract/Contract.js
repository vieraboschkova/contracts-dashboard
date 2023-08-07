import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const initialFetchState = {
  done: false,
  loading: false,
};

function Contract() {
  const { contractId } = useParams();
  const [contract, setContract] = useState({});
  const [patient, setPatient] = useState({});
  const [treatment, setTreatment] = useState({});
  const [medicinal, setMedicinal] = useState({});

  const [fetchState, setFetchState] = useState({ ...initialFetchState });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchContractData = async () => {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      try {
        const contractRes = await fetch('/api/contracts/' + contractId);
        if (contractRes.status !== 200)
          throw Error({ message: contractRes.statusText });
        const contractJSON = await contractRes.json();

        if (contractJSON) {
          setContract(contractJSON);
          setFetchState({ done: true, success: true, loading: false });
        } else {
          throw Error({ message: 'Could not fetch contract' });
        }
      } catch (error) {
        setFetchState({ done: true, success: false, loading: false });
      }
    };
    if (location?.state?.contract) {
      setContract({ ...location.state.contract });
      setFetchState({ done: true, success: true, loading: false });
    } else {
      fetchContractData();
    }

    return () => {
      setContract({});
      setFetchState({ ...initialFetchState });
    };
  }, []);

  const handleGoToContracts = () => {
    navigate('/contracts');
  };

  const handleUpdateContract = () => {
    // TODO: show update modal
  };

  const handleShowPatientsDetails = async () => {
    try {
      const patientRes = await fetch('/api/patients/' + contract.patient);

      if (patientRes.status !== 200)
        throw Error({ message: patientRes.statusText });
      const patientJSON = await patientRes.json();

      if (patientJSON) {
        setPatient({ ...patientJSON });
      } else {
        throw Error({ message: 'Could not fetch patient data' });
      }
    } catch (error) {
      setFetchState({ done: true, success: false, loading: false });
    }
  };

  const handleShowTreatmentDetails = async () => {
    try {
      setFetchState((prev) => {
        return { ...prev, loading: true };
      });
      const treatmentRes = await fetch('/api/treatments/' + contract.treatment);

      if (treatmentRes.status !== 200)
        throw Error({ message: treatmentRes.statusText });

      const treatmentJSON = await treatmentRes.json();
      if (!treatmentJSON.medicinal)
        throw Error({ message: 'Missing treatment data' });

      const medicinalRes = await fetch(
        '/api/medicinals/' + treatmentJSON.medicinal,
      );
      if (medicinalRes.status !== 200)
        throw Error({ message: medicinalRes.statusText });

      const medicinalJSON = await medicinalRes.json();

      if (medicinalJSON) {
        setTreatment({ ...treatmentJSON });
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
          onClick={handleGoToContracts}
          variant="contained"
          color="info"
          disabled={fetchState.loading}
        >
          <span className="text__white">Back to Contracts</span>
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
              ContractId: {contract._id}
            </Typography>
            <hr></hr>
            <Typography variant="div" gutterBottom className="text__white">
              Start: {new Date(contract.start).toLocaleDateString('en-UK')}
            </Typography>
            <hr></hr>
            <Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="div" gutterBottom className="text__white">
                  Treatment: {contract.treatment}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {!treatment.name ? (
                  <Button
                    size="small"
                    onClick={handleShowTreatmentDetails}
                    variant="contained"
                    color="info"
                    disabled={contract.deathMonth}
                    style={{ marginLeft: 'auto' }}
                  >
                    <span className="text__white">Show Treatment details</span>
                  </Button>
                ) : (
                  <>
                    <p className="text__white">Name: {treatment.name}</p>
                    <p className="text__white">Max Age: {treatment.maxAge}</p>
                    <p className="text__white">
                      Max Stage: {treatment.maxStage}
                    </p>
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
            <hr></hr>
            <Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="div" gutterBottom className="text__white">
                  Patient Id: {contract.patient}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {!patient.name ? (
                  <Button
                    size="small"
                    onClick={handleShowPatientsDetails}
                    variant="contained"
                    color="info"
                    disabled={contract.deathMonth}
                    style={{ marginLeft: 'auto' }}
                  >
                    <span className="text__white">Show Patient details</span>
                  </Button>
                ) : (
                  <>
                    <p className="text__white">Name: {patient.name}</p>
                    <p className="text__white">Birth: {patient.birth}</p>
                    <p className="text__white">Stage: {patient.stage}</p>
                  </>
                )}
              </Grid>
            </Grid>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              OS Max Time In Months: {contract.OSMaxTimeInMonths}
            </Typography>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              OS percentage: {contract.OSPercentage}%
            </Typography>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              No OS percentage: {contract.noOSPercentage}%
            </Typography>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              PSF Max Time In Months: {contract.PSFMaxTimeInMonths}
            </Typography>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              PSF percentage: {contract.PSFPercentage}%
            </Typography>
            <hr></hr>
            <Typography variant="p" gutterBottom className="text__white">
              No PSF percentage: {contract.noPSFPercentage}%
            </Typography>
          </CardContent>
        )}
        {/* TODO: add contrcact stage and show conditionally if updates can be made */}
        <CardActions>
          <Button
            size="small"
            onClick={handleUpdateContract}
            variant="contained"
            color="info"
            disabled={contract.deathMonth || fetchState.success === false}
          >
            <span className="text__white">Update contract details</span>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Contract;
