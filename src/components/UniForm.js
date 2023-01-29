import dynamic from 'next/dynamic';
import { useState, useMemo, useTransition } from 'react';
import { fetchUniWeather } from '../modules/fetch';
const UniGrid = dynamic(() => import('./UniGrid'));

import { 
  Box, Button, 
  TextField, InputLabel, Select, MenuItem, FormControl,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

export function UniForm(props) {
  // Handling inputs and outputs
  const [uni, setUni] = useState();
  const [isDegC, setDegC] = useState(true);
  const [isMetric, setMetric] = useState(true);
  const [res, setRes] = useState();
  
  const ErrorMes = ({mes}) => (<Typography variant="error">{mes}</Typography>);

  function handleSubmit() {
    event.preventDefault();
    setRes(
      <LoadingButton loading loadingPosition="start" variant="text" startIcon={<SaveIcon />}>
        Loading...
      </LoadingButton>
    );
    fetchUniWeather(uni, isDegC, isMetric)
    .then(list => setRes(<UniGrid list={list} isDegC={isDegC} isMetric={isMetric} />))
    .catch(err => setRes(<ErrorMes mes={err.message} />));
  }

  function handleKeyPress() {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  }
  
  function handleUni(event) {
    setUni(event.target.value);
  }
  
  function handleDegC(event) {
    setDegC(event.target.value);
  }
  
  function handleMetric(event) {
    setMetric(event.target.value);
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: {xs: 3, md: 4},
        margin: {xs: 1.5, sm: 3, md: 4},
        mb: {xs: 3, sm: 4, md: 5},
      }}
      onKeyPress={handleKeyPress}
    >
      <Typography tabIndex="0" variant="h1" sx={{ fontSize: {xs: '2.5rem', md: '3rem'}, fontWeight: 600 }}>UniWeather</Typography>
      <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: {xs: 2, md: 1} }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField onChange={handleUni} label="Look up universities" autoComplete="off" variant="outlined"/>
          <FormControl>
            <InputLabel aria-label={`Choose degree unit. Currently choosing: ${isDegC ? 'Celcius' : 'Fahrenhait'}`} id="degree-label">Degree</InputLabel>
            <Select labelId="degree-label" id="degree-select" value={isDegC} label="Degree" onChange={handleDegC}>
              <MenuItem role="tab" aria-label="Degree Celcius" value={true}>°C</MenuItem>
              <MenuItem role="tab" aria-label="Degree Fahrenhait" value={false}>°F</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl>
          <InputLabel aria-label={`Choose unit system. Currently choosing: ${isMetric ? 'Metric' : 'Imperial'}`} id="unit-label">Unit System</InputLabel>
          <Select labelId="unit-label" id="unit-select" value={isMetric} label="Unit System" onChange={handleMetric}>
            <MenuItem aria-label="Metric System (such as meters)" value={true}>Metric System (meters)</MenuItem>
            <MenuItem aria-label="Imperial System (such as inches)" value={false}>Imperial System (inches)</MenuItem>
          </Select>
        </FormControl>
        <Button aria-label="Search" variant="contained" onClick={handleSubmit} sx={{ py: { xs: 1.5 }, fontSize: { xs: '1.125rem', md: '1rem' }}}>
          Search
        </Button>
      </Box>
      {props.children}
      {res}
    </Box>
  );
}