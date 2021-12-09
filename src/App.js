import React, { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
// import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import CanvasJSReact from './canvasjs.react';
import './App.css';
// import CanvasJS from 'canvasjs';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const spanStyle = {
  position: 'absolute',
  top: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: '#d85757',
  padding: '0px 4px',
  color: '#ffffff'
}

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  },
});

function App() {
  const DEFAULT_DATA_LIMIT = 50_000;

  const classes = useStyles();
  const [dataLimit, setDataLimit] = useState(DEFAULT_DATA_LIMIT);
  const [timeToRender, setTimeToRender] = useState(0);
  const [options, setOptions] = useState({
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "CanvasJS Charts Demo"
    },
    data: null
  });

  const chartRef = useRef(null);

  const renderPoints = (limit = DEFAULT_DATA_LIMIT) => {
    var y = 100;
    var data = [];
    var dataSeries = { type: "line" };
    var dataPoints = [];

    let startTime = new Date();

    // Clear data if already exists
    // if (chartRef.current) {
    //   chartRef.current.set("data", null);
    //   chartRef.current.render();
    // }

    for (var i = 0; i < limit; i += 1) {
      y += Math.round(Math.random() * 10 - 5);
      dataPoints.push({
        x: i,
        y: y
      });
    }

    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);

    setOptions({
      ...options,
      data: data // random data
    });

    setTimeToRender(new Date().getTime() - startTime.getTime());

    return options;
  }

  const handleDataLimitChange = (event) => {
    setDataLimit(event.target.value);
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="xl">
        <Paper elevation={4} sx={{ width: "100%", minHeight: 500, marginTop: 5, marginBottom: 5 }}>
          <Button
            className={classes.button}
            sx={{ color: "#fff", margin: 1.5 }}
            onClick={() => renderPoints(dataLimit)}
          >
            Load Data
          </Button>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Records to Render</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={dataLimit}
              label="Records to Render"
              onChange={handleDataLimitChange}
            >
              <MenuItem value={10_000}>10,000 Records</MenuItem>
              <MenuItem value={50_000}>50,000 Records</MenuItem>
              <MenuItem value={100_000}>100,000 Records</MenuItem>
              <MenuItem value={500_000}>500,000 Records</MenuItem>
              <MenuItem value={1_000_000}>1,000,000 Records</MenuItem>
            </Select>
            <FormHelperText>Select/Change records to render</FormHelperText>
          </FormControl>
          <CanvasJSChart options={options} onRef={ref => chartRef.current = ref} />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          <span style={spanStyle}>{timeToRender + " ms"}</span>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default App;
