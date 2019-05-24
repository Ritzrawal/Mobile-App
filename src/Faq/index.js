import React, { Component } from "react";


import FaqList from "./Faq.js";

import FAQ from "./Faq2.js";

import { createStackNavigator } from "react-navigation";
export default (FaqNavigator = createStackNavigator(
  {

    FaqList: { screen: FaqList },
    FAQ: { screen: FAQ },


  },
  {
    initialRouteName: "FAQ",
  }

));
