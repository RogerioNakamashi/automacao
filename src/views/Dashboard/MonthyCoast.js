import React, {useState, useEffect} from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {Years, Months} from './constants.js';
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function Monthlycost(){
  const classes = useStyles();
  const [month, setMonth] = useState(4); 
  const [year, setYear] = useState(2020);
  const [cost, setcost] = useState(0);

  const handleMonthChange = (event) => {
    const _month = event.target.value
    setMonth(_month);
    updatecostList(_month, year);
  }

  const handleYearChange = (event) => {
    const _year = event.target.value
    setYear(_year);
    updatecostList(month, _year);
  }

  const updatecostList = (_month, _year) => {
    axios.put('http://www.mocky.io/v2/5e9bb8e53300009532bf1802', {data: {year: _year, month: _month}})
    .then(response => {
      setcost(response.data.data.monthly_cost);
    })
  }

  useEffect(() => updatecostList(month, year));

    return(
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color="danger">
            <Icon>info_outline</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Valor da conta</p>
          <h3 className={classes.cardTitle}>{`R$ ${cost.toFixed(2)}`}</h3>
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
                  <MenuItem value={index+1}>{item}</MenuItem>
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