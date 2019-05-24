import React, { Component } from "react";

import AboutUs from "./aboutUs.js";
import ContactUs from "./contactUs.js";
import Privacy from "./privacy.js";
import Setting from "./setting.js";

import { createStackNavigator } from "react-navigation";
export default (SettingNavigator = createStackNavigator(
  {
    Setting: { screen: Setting },
    ContactUs: { screen: ContactUs },
    Privacy: { screen: Privacy },
    AboutUs: { screen: AboutUs },
  },
  {
    initialRouteName: "Setting"
  }
));
