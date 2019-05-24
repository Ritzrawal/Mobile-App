import React, { Component } from "react";

import InRisk from "./inRisk.js";
import MaterialFirst from "./firstscree";
import Materialsecond from "./materialsecond"; 
import MaterlialLast from './materslidelast'
import MaterialLastScreen from './materialLast'



import { createStackNavigator } from "react-navigation";
export default (RiskNavigator = createStackNavigator(
  {

    InRisk: { screen: InRisk },
    MaterialFirst:{screen:MaterialFirst},
    Materialsecond:{screen:Materialsecond},
    MaterlialLast:{screen:MaterlialLast},
    MaterialLastScreen:{screen:MaterialLastScreen}
   
   

  },
  {
    initialRouteName: "MaterialFirst",
  }

));
