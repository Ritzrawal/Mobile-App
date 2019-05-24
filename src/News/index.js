import React, { Component } from "react";
// import NewsList from "./NewsList.js";
// import NewsDetail from "./NewsDetail.js";
// import App from "./App.js";
import FirstScreen from "./firstscreen"
import { createStackNavigator } from "react-navigation";
export default (NewsNavigator = createStackNavigator(
  {

     FirstScreen: { screen: FirstScreen },
    // NewsDetail: { screen: NewsDetail },
    // App: { screen: App },
    // FirstScreen :{screen:FirstScreen},

  },
  {
    initialRouteName: "FirstScreen",
   
  },
  
    

));
