import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import StrengthFirst from "./strengthfirst"
import StrengthSecond from "./strengthsecond"
import SafetyList from "./lastgrid"
import LastSlide from "./lastslide"
import Swappinglast from './swappinglast'
import StrengthTechnique from './strengtechnique'
 import StrengthViewAll from './strengthviewall'
import SwappingLastslide from './swppinglastslide'
import StrngthFirstSlide from './strengthfirstslide'
import StrengthViewAllgetNo from './strengthviewlno'
import StartStrengthLast from './startstrengthlast'
import StrengthTechniqueViewAll from './strengthentechniqueviewall'
export default (DocumentNavigator = createStackNavigator(
  {
    StrengthFirst:{screen:StrengthFirst},
    StrengthSecond :{screen:StrengthSecond},
    SafetyList:{screen:SafetyList},
    LastSlide:{screen:LastSlide},
    Swappinglast:{screen:Swappinglast},
    SwappingLastslide:{screen:SwappingLastslide},
     StrengthViewAll:{screen:StrengthViewAll},
    StrngthFirstSlide:{screen:StrngthFirstSlide},
    StrengthViewAllgetNo:{screen:StrengthViewAllgetNo},
    // Strengthtechnique:{screen:Strengthtechnique},
    StrengthTechnique:{screen:StrengthTechnique},
    StartStrengthLast:{screen:StartStrengthLast},
    StrengthTechniqueViewAll:{screen:StrengthTechniqueViewAll}
  },
  {
    initialRouteName: "StrengthViewAllgetNo",
  }

));
