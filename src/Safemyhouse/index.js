import React, { Component } from "react";
import SafeHouseFirst from './safeFirst'
import HomeScreen from '../HomeScreen/HomeScreen'
import SafeHouseSecond from './safesecond' 
import CardsSwiper from "./cardswiper"
import SafeHouseLast from './safehouselast'
//  import SafeHouseBadImages from './safebadimages'
import { createStackNavigator } from "react-navigation";
export default (OmpongNavigator = createStackNavigator(
  {
    
    SafeHouseFirst:{screen:SafeHouseFirst},
     RenderPage:{screen:HomeScreen},
     SafeHouseSecond:{screen:SafeHouseSecond},
     CardsSwiper:{screen:CardsSwiper},
     SafeHouseLast:{screen:SafeHouseLast},
    //  SafeHouseBadImages:{screen:SafeHouseBadImages},
   
  },
  {
    initialRouteName: "SafeHouseFirst"
  }
));
