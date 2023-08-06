import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function Contract() {
  const { contractId } = useParams();
  const [contract, setContract] = useState({});
  const [patient, setPatient] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  // TODO: Get from location state or fetch
  const handleError = () => {
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
        handleError();
      }
    } catch (error) {
      handleError();
    }
  };

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const contractRes = await fetch('/api/contracts/' + contractId);

        if (contractRes.status !== 200)
          throw Error({ message: contractRes.statusText });
        const contractJSON = await contractRes.json();

        if (contractJSON) {
          setContract(contractJSON);
        } else {
          handleError();
        }
      } catch (error) {
        handleError();
      }
    };
    if (location?.state?.contract) {
      setContract({ ...location.state.contract });
    } else {
      fetchContractData();
    }

    return () => {
      setContract({});
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
          <Typography variant="h4" gutterBottom className="text__white">
            ContractId: {contract._id}
          </Typography>
          <hr></hr>
          <Typography variant="div" gutterBottom className="text__white">
            Start: {new Date(contract.start).toLocaleDateString('en-UK')}
          </Typography>
          <hr></hr>
          <Typography variant="div" gutterBottom className="text__white">
            Treatment: {contract.treatment}
          </Typography>
          <hr></hr>
          <Box>
            <Typography variant="div" gutterBottom className="text__white">
              Patient Id: {contract.patient}
            </Typography>
            {!patient.name ? (
              <Button
                size="small"
                onClick={handleShowPatientsDetails}
                variant="contained"
                color="info"
                disabled={contract.deathMonth}
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
          </Box>
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
        {/* TODO: add contrcact stage and show conditionally if updates can be made */}
        <CardActions>
          <Button
            size="small"
            onClick={handleUpdateContract}
            variant="contained"
            color="info"
            disabled={contract.deathMonth}
          >
            <span className="text__white">Update contract details</span>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Contract;
