import React, { Component } from "react";


import FinancialRecordList from "./financialRecordList.js";
import FinancialRecordOffline from "./financialRecordOffline";
import FinancialRecordDetail from "./financialRecordDetail.js";
import download from "./download.js";
import { createStackNavigator } from "react-navigation";
export default (FinancialNavigator = createStackNavigator(
  {

    FinancialRecordList: { screen: FinancialRecordList },
    FinancialRecordOffline:{screen: FinancialRecordOffline},
    download: { screen: download },

  },
  {
    initialRouteName: "FinancialRecordList",
  }

));
