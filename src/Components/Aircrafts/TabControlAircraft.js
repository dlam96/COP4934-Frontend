import React from "react";
import { 
  Tabs, 
  Tab,
} from "@material-ui/core";

function TabControlAircraft(props) {

  const { value } = props;

  let tab1 = <Tab label="Aircrafts" />
  let tab2 = <Tab label="Models" disabled />      
  let tab3 = <Tab label="Crew" disabled />

  if (value === 1) {
    tab1 = <Tab label="Aircrafts" disabled/>
    tab2 = <Tab label="Models" />      
    tab3 = <Tab label="Crew" disabled />
  } 

  if (value === 2) {
    tab1 = <Tab label="Aircrafts" disabled/>
    tab2 = <Tab label="Models" disabled />      
    tab3 = <Tab label="Crew" />
  }

  return (
    <Tabs value={value} indicatorColor="primary" onChange={props.handleChange}>
      {tab1}
      {tab2}
      {tab3}
    </Tabs> 
  );
}

export default TabControlAircraft;