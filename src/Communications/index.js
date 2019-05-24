import React, { Component } from "react";
import AboutUs from "./AboutUs.js";
import Branches from "./Branches.js";
import ContactUs from "./ContactUs.js";
import Faq from "./Faq.js";


import { createStackNavigator } from "react-navigation";
export default (CommunicationNavigator = createStackNavigator(
  {
  //  AboutUs: { screen: AboutUs },
    //Branches: { screen: Branches },
    ContactUs: { screen: ContactUs },
    //Faq: { screen: Faq },
    
  },
  {
    initialRouteName: "ContactUs"
  }
));
