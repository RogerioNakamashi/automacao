import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
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
import { SAVINGS_URL } from 'urls.js';
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
    axios.put(SAVINGS_URL, {data: {year: year}})
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