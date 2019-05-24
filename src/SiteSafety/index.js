import React, { Component } from "react";

import SafetyList from "./safety.js";
import SliderSafety from './safetyslider'
import ListRenview from './listview'
import Rendersafety from './renderview'
import ViewAllcontents from './viewall'

import { createStackNavigator } from "react-navigation";
export default (SafetyNavigator = createStackNavigator(
  {
    SafetyList: { screen: SafetyList },
    SliderSafety :{screen:SliderSafety},
    ListRenview:{screen:ListRenview},
    Rendersafety:{screen:Rendersafety},
    ViewAllcontents:{screen:ViewAllcontents}
  },
  {
    initialRouteName: "SafetyList"
  }
));
