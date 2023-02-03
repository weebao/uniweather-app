import { useState, useEffect, useRef } from 'react';
import { Grid, Box, Container, Paper, Typography } from '@mui/material';

import WMOCode from '../modules/wmo.json';

export default function UniGrid({list, isDegC, isMetric}) {
  return (
    <Grid container
      id="results"
      tabIndex="0"
      aria-label="Results"
      sx={{ 
        display: 'grid',
        width: '100%', 
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fill, minmax(348px, 1fr))', 
      }} 
      gap={3}
    >
      {/* Mapping fetched array to individual weather tiles */}
      {list.map((data) => (
        <UniTile data={data} isDegC={isDegC} isMetric={isMetric} />
      ))}
    </Grid>
  )
}

function UniTile({data, isDegC, isMetric}) {
  // Handling gradient and flipping toggling
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function resetFlip() {
    setIsClicked(false);
    setIsHovered(false);
  }

  // Handling backside's width and height resizing
  const [frontHeight, setFrontHeight] = useState(0);
  const [backHeight, setBackHeight] = useState(0);
  const [isSmallTile, setIsSmallTile] = useState(false);
  const [isXSmallTile, setIsXSmallTile] = useState(false);

  const frontRef = useRef(null);
  const backRef = useRef(null);
  const tileRef = useRef(null);

  function adjustBackSize() {
    if (frontRef.current !== null) {
      setFrontHeight(frontRef.current.clientHeight);
    }
    if (backRef.current !== null) {
      setBackHeight(backRef.current.clientHeight + 64);
    }
    if (tileRef.current !== null) {
      setIsSmallTile(tileRef.current.clientWidth <= 500);
      setIsXSmallTile(tileRef.current.clientWidth <= 400);
    }
  }

  useEffect(() => {
    adjustBackSize();
    window.addEventListener('resize', adjustBackSize);
  });

  // Handling time formatting
  function timeFormat(date) {
    return Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }

  // Reusable component for displaying two temperatures
  const TwoTemps = ({temp1, temp2, label1, label2}) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Box sx={{ display: 'inline' }}>
          <Typography variant="caption">{`${label1}: `}</Typography>
          <Typography variant="subtitle1">
            {typeof temp1 === "string" ? temp1 :
            temp1.toFixed(0).replace('-0', '0').concat(isDegC ? "°C" : "°F")}
          </Typography>
        </Box>
        <Box sx={{ display: 'inline'}}>
          <Typography variant="caption">{`${label2}: `}</Typography>
          <Typography variant="subtitle1">
            {typeof temp2 === "string" ? temp2 :
            temp2.toFixed(0).replace('-0', '0').concat(isDegC ? "°C" : "°F")}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid item
      tabIndex="0" 
      aria-label={`Weather data of ${data.name}`}
      ref={tileRef}
      sx={{
        display: 'table',
        perspective: { xs: '1800px', md: '1500px' },
        height: frontHeight
      }}
      onClick={() => setIsClicked(!isClicked)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetFlip}
    >
        <Container tabIndex="0" className={(isClicked && isHovered) ? "isFlipped" : ""}>
          <Paper ref={frontRef}  sx={{ position: 'absolute' }} className={"gradient" + (isHovered ? " gradient-activated" : "")}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h2" sx={{ fontSize: {xs: '1.5rem'}, fontWeight: 600 }}>{data.name}</Typography>
              <Box sx={{ mb: 2, mt: 0.5 }}>{data.location}</Box>
            </Box>
            <Box aria-multiline="true" sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'inline'}}>
                <Typography variant="caption">Current Temperature: </Typography>
                <Typography variant="subtitle1">
                  {typeof data.curTemp === "string" ? data.curTemp :
                  data.curTemp.toFixed(0).replace('-0', '0').concat(isDegC ? "°C" : "°F")}
                </Typography>
              </Box>
              <Box sx={{ display: 'inline' }}>
                <Typography variant="caption">Humidity: </Typography>
                <Typography variant="subtitle1">
                  {typeof data.humid === "string" ? data.humid :
                  data.humid.toFixed(0).concat("%")}
                </Typography>
              </Box>
              <Box sx={{ display: 'inline' }}>
                <Typography variant="caption">Precipitation: </Typography>
                <Typography variant="subtitle1">
                  {typeof data.prep === "string" ? data.prep :
                  data.prep.toFixed(1).concat(isMetric ? " mm" : " inches")}
                </Typography>
              </Box>
              <Box sx={{ display: 'inline' }}>
                <Typography variant="caption">Wind Speed: </Typography>
                <Typography variant="subtitle1">
                  {typeof data.wind === "string" ? data.wind :
                  data.wind.toFixed(1).concat(isMetric ? " km/h" : " mph")}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper
            sx={{
              position: 'absolute',
              top: 0,
              left: '0px',
              transform: {
                xs: ((isClicked && isHovered) ? `translateY(${(frontHeight - backHeight) / 2}px) ` : '') + 'rotateY(180deg) scale(1.025) !important',
                sm: ((isClicked && isHovered) ? `translateY(${(frontHeight - backHeight) / 2}px) ` : '') + 'rotateY(180deg) scale(1.05) !important'
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1
            }}
            className={"gradient" + (isHovered ? " gradient-activated" : "")}
          >
            <Box ref={backRef} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'top', gap: '0rem' }}>
                  <Typography 
                    variant="caption" 
                    sx={{ fontSize: (isSmallTile ? (isXSmallTile ? '3.1rem' : '3.25rem') : '3.5rem'), fontWeight: 600, lineHeight: 1 }}
                  >
                    {typeof data.curTemp === "string" ? data.curTemp :
                      data.curTemp.toFixed(0).replace('-0', '0')}
                  </Typography>
                  <Typography variant="h1" sx={{ fontSize: (isSmallTile ? (isXSmallTile ? '1.18rem' : '1.4rem') : '1.5rem'), fontWeight: 500, lineHeight: 1.6 }}>{isDegC ? "°C" : "°F"}</Typography>
                </Box>
                <TwoTemps temp1={data.maxTemp} temp2={data.minTemp} label1="High" label2="Low" />
                <TwoTemps temp1={data.appTemp} temp2={data.dew} label1="Feels like" label2="Dewpoint" />
              </Box>
              <Typography>
                  The sun rises at {timeFormat(data.sunrise)} and sets at {timeFormat(data.sunset)} today.
              </Typography>
              <Typography>
                  {WMOCode[data.wmo]}
              </Typography>
            </Box>
          </Paper>
        </Container>
    </Grid>
  );
}