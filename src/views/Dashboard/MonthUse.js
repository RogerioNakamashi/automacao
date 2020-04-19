import React, {useState, useEffect} from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  emailsSubscriptionChart,
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import { MONTH_USE_URL } from "urls";
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
    axios.put(MONTH_USE_URL, {data: {year: year}})
    .then(response => {
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
