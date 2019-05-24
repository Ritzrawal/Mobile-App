import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import CommunicationNavigator from "../Communications/index.js";
import FinancialNavigator from "../FinancialRecord/index";
import FaqNavigator from "../Faq/index.js";
import NewsNavigator from "../News/index.js";
import RiskNavigator from "../Materialquality/index";
import SafetyNavigator from "../SiteSafety/index.js";
import SettingNavigator from "../Setting/index.js";
import DocumentNavigator from "../Stengthmyhouse/index";
import LoginStackNavigator from "../Login/index.js";
import OmpongNavigator from "../Safemyhouse/index";
import SideBar from "../SideBar/SideBar.js";
import SwiperUpperhomescreen from './uperswiper'
import { createDrawerNavigator } from "react-navigation";

export default( HomeScreenRouter = createDrawerNavigator(
  {
     Home: { screen: HomeScreen,navigationOptions: { gesturesEnabled: false } }, 
    CommunicationNavigator: { screen: CommunicationNavigator },
    FinancialNavigator: { screen: FinancialNavigator },
   FaqNavigator: { screen: FaqNavigator },
   NewsNavigator: { screen: NewsNavigator },
   RiskNavigator: { screen: RiskNavigator },
   SafetyNavigator: { screen: SafetyNavigator },
   DocumentNavigator: { screen: DocumentNavigator },
   LoginStackNavigator: { screen: LoginStackNavigator },
   SettingNavigator: { screen: SettingNavigator },
   OmpongNavigator: { screen: OmpongNavigator },
   SwiperUpperhomescreen:{screen:SwiperUpperhomescreen},
   HomeScreen:{screen:HomeScreen},
  
  },

  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />
  }
));
// export default HomeScreenRouter;
