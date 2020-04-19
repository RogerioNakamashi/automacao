import React, {useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  ProducedEnergyChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {Years, Months, MonthIndex} from './constants.js';
import axios from 'axios';
const useStyles = makeStyles(styles);



export default function Savings(){
  const classes = useStyles();
  const [month, setMonth] = useState(3); 
  const [year, setYear] = useState(2020);
  const [savings, setSavings] = useState(0);
  let savingsList = [];

  const handleMonthChange = (event) => {
    const month = event.target.value
    setMonth(month);
    setSavings(savingsList[month].economy);
  }

  const handleYearChange = (event) => {
    const year = event.target.value
    setYear(year);
    updateSavingsList(); 
  }

  const updateSavingsList = () => {
    axios.put('http://www.mocky.io/v2/5e9bb98e3300006100bf1808', {data: {year: year}})
    .then(response => {
      savingsList = response.data.data;
      setSavings(savingsList[month].economy);
    })
  }

  useEffect(updateSavingsList);

    return(
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="success">
            <Store />
          </CardIcon>
          <p className={classes.cardCategory}>Economia</p>
          <h3 className={classes.cardTitle}>{`R$ ${savings.toFixed(2)}`}</h3>
        </CardHeader>
        <CardFooter stats>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Mês</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={month}
                onChange={handleMonthChange}
                label="ano"
              >
                {Months.map((item, index) => 
                  <MenuItem value={index}>{item}</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Ano</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={year}
                onChange={handleYearChange}
                label="ano"
                >
                {Years.map((item) => 
                  <MenuItem value={item}>{item}</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </CardFooter>
      </Card>
    )
}