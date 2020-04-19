import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Savings from './Savings.js'
import MonthlyCoast from "./MonthyCoast.js";
import ProducedEnergy from "./ProducedEnergy.js";
import MonthUse from "./MonthUse.js";
import HourUse from "./HourUse.js";

export default function Dashboard() {
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
          <MonthUse />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <HourUse />
        </GridItem>
      </GridContainer>
    </MuiPickersUtilsProvider>
  );
}