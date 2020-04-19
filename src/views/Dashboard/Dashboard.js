import React from "react";
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
import Savings from './Savings.js'
import MonthlyCoast from "./MonthyCoast.js";
import ProducedEnergy from "./ProducedEnergy.js";
import MonthUse from "./MonthUse.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Savings />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <MonthlyCoast/>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <ProducedEnergy />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          {/* <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
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
                  value={2020}
                  // onChange={handleChange}
                  label="ano"
                >
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                </Select>
              </FormControl>
            </CardFooter>
          </Card> */}
          <MonthUse />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
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
                  label="Date picker inline"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </MuiPickersUtilsProvider>
  );
}