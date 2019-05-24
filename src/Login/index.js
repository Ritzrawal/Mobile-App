

//import AgentLoginScreen from "./Agent.js";
import StaffLoginScreen from "./Staff.js";
//import PolicyHolderLoginScreen from "./PolicyHolder.js";
import { createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator,HeaderBackButton  } from 'react-navigation';
import { View,TouchableOpacity,MenuImage,Text,Button,Icon, } from "react-native";

import React from "react";


  export default (LoginStackNavigator = createStackNavigator(
    {
  
    //  PolicyHolder: { screen: PolicyHolderLoginScreen },
      Staff: { screen: StaffLoginScreen },
  
    },
    {
      initialRouteName: "Staff",
    }
  
  ));
  