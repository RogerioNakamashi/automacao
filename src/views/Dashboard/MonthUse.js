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



export default function MonthUse(){
  const classes = useStyles();
  const [year, setYear] = useState(2020);
  const [useList, setUseList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const handleChange = (event) => {
    const year = event.target.value
    setYear(year);
    updateUseList(); 
  }

  const updateUseList = () => {
    axios.put('http://www.mocky.io/v2/5e9bb88a3300009532bf17fe', {data: {year: year}})
    .then(response => {
      console.log(response.data.data)
      setUseList(response.data.data);
    })
  }

  useEffect(updateUseList, [year]);

    return(
      <Card chart>
        <CardHeader color="warning">
          <ChartistGraph
            className="ct-chart"
            data={{labels: emailsSubscriptionChart.data.labes, series: [useList]}}
            type="Bar"
            options={emailsSubscriptionChart.options}
            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
            listener={emailsSubscriptionChart.animation}
            />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Consumo mensal</h4>
          <p className={classes.cardCategory}>KWh</p>
        </CardBody>
        <CardFooter chart>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={year}
              onChange={handleChange}
              label="ano"
            >
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </FormControl>
        </CardFooter>
      </Card>
    )
}
