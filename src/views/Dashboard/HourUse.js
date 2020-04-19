import React, {useState, useEffect} from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  completedTasksChart
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function HourUse(){
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-04-19T21:11:54'));
  const [series, setSeries] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0])

  const handleDateChange = (_date) => {
    setSelectedDate(_date);
    updateSeries(_date);
  }
  const updateSeries = (_date) => {
    axios.put('http://www.mocky.io/v2/5e9bb8b93300006100bf17ff', {data: {year: _date.getFullYear(), month: _date.getMonth()+1, day: _date.getDate()}})
    .then(response => {
      setSeries(response.data.data);
    })
  }
  useEffect(() => {updateSeries(selectedDate);}, [selectedDate]);
    return(
      <Card chart>
        <CardHeader color="danger">
          <ChartistGraph
            className="ct-chart"
            data={{labels: completedTasksChart.data.labels, series: [series]}}
            type="Line"
            options={completedTasksChart.options}
            listener={completedTasksChart.animation}
            />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Energia consumida</h4>
          <p className={classes.cardCategory}>Consumo dário</p>
        </CardBody>
        <CardFooter chart>
          <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data"
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