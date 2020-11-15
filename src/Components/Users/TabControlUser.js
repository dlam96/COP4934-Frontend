import React from "react";
import { 
  Tabs, 
  Tab,
} from "@material-ui/core";

function TabControlUser(props) {

  const { value } = props;

  let tab1 = <Tab label="Users" />
  let tab2 = <Tab label="New Users Approval" disabled />      

  if (value === 1) {
    tab1 = <Tab label="Users" disabled />
    tab2 = <Tab label="New Users Approval" />      
  } 

  return (
    <Tabs value={value} indicatorColor="primary" onChange={props.handleChange}>
      {tab1}
      {tab2}
    </Tabs> 
  );
}

export default TabControlUser;
