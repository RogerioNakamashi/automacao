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
import getDate from '@date-io/date-fns';
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

export default function ProducedEnergy(){
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-04-19T21:11:54'));
  const [series, setSeries] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0])

  const handleDateChange = (_date) => {
    setSelectedDate(_date);
    updateSeries(_date);
  }
  const updateSeries = (_date) => {
    axios.put('http://www.mocky.io/v2/5e9bb9253300005000bf1805', {data: {year: _date.getFullYear(), month: _date.getMonth()+1, day: _date.getDate()}})
    .then(response => {
      setSeries(response.data.data.map(item => item.production));
    })
  }
  useEffect(() => {updateSeries(selectedDate);}, [selectedDate]);
    return(
      <Card chart>
        <CardHeader color="success">
          <ChartistGraph
            className="ct-chart"
            data={{labels: ProducedEnergyChart.data.labels, series: [series]}}
            type="Line"
            options={ProducedEnergyChart.options}
            listener={ProducedEnergyChart.animation}
            />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Energia produzida</h4>
          <p className={classes.cardCategory}>
            <span className={classes.successText}>
              <ArrowUpward className={classes.upArrowCardCategory} /> 15%
            </span>{" "}
            acima da média dos dias anteriores.
          </p>
        </CardBody>
        <CardFooter chart>
          <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </CardFooter>
      </Card>
    )
}