const globalState={};

import React, { Component } from "react";
import {View ,ActivityIndicator,StyleSheet,AppState,AsyncStorage} from "react-native";
import { Container, Content, Picker, Button, Text,StyleProvider,Root } from "native-base";
import Storage from 'react-native-storage';

import getTheme from './src/theme/components';
import commonColor from './src/theme/variables/commonColor';
import SplashScreen from 'react-native-splash-screen'

import HomeScreen from "./src/HomeScreen/index.js";
import RNLanguages from 'react-native-languages';
import AppIntroSlider from 'react-native-app-intro-slider';
import CommunicationNavigator from "./src/Communications/index.js";
import FinancialNavigator from "./src/FinancialRecord/index";
import FaqNavigator from "./src/Faq/index.js";
import NewsNavigator from "./src/News/index.js";
import RiskNavigator from "./src/Materialquality/index";
import SafetyNavigator from "./src/SiteSafety/index.js";
import SettingNavigator from "./src/Setting/index.js";
import DocumentNavigator from "./src/Stengthmyhouse/index";
import LoginStackNavigator from "./src/Login/index.js";
import {translate} from 'react-i18next';
import i18n from './src/i18n/index.js';
import OmpongNavigator from "./src/Safemyhouse/index";
import SideBar from "./src/SideBar/SideBar.js";
import { createDrawerNavigator,createStackNavigator } from "react-navigation";





export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, 
  //defaultExpires: 1000 * 3600 * 24,
  defaultExpires: 1 *1 *1,
  enableCache: true,
  sync: {
   
  }
});
const HomeScreenRouter = createDrawerNavigator(
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
    OmpongNavigator:{screen:OmpongNavigator},

  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
      Drawer: {screen: HomeScreenRouter},
  },
  {
      initialRouteName: "Drawer",
      headerMode: "none"
  }
);

const WrappedStack = () => {
  return (
      <Root>
          <AppNavigator screenProps={{t: i18n.getFixedT()}}/>
      </Root>
  )
};





const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack);
 class App extends Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
     
        currentLanguage: RNLanguages.language,
    
          showRealApp: '',
          appState: AppState.currentState,
          //To show the main page of the app
        
  
    };
    
  }
  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    try {
       AsyncStorage.setItem('walkthrough', JSON.stringify('value'));
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
   
  };
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    console.log("INTO THE SKIP");
    this.setState({ showRealApp: true });
    try {
       AsyncStorage.setItem('walkthrough', JSON.stringify('value'));
       console.log("INTO THE SKIP SET DATE");
    } catch (error) {
      // Error retrieving data'
      console.log("INTO THE SKIP ERROR");
      console.log(error.message);
    }
  };
  
 componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      //AppState.addEventListener('change', this._handleAppStateChange);
      setTimeout(() => {
        SplashScreen.hide()
      }, 100)
     this.setState({ isReady: true });
  //  AppState.addEventListener('change', this._handleAppStateChange);

    // this.checkPermission();
   //this.createNotificationListeners(); //add this line
  }
  
  async componentWillMount() {
  

    try {
    var app_intro = await AsyncStorage.getItem('walkthrough');
      if (app_intro=!null) {
        this.setState({
          showRealApp:true
        });
      } else {
      
        this.setState({
          showRealApp:false
        });
      }
    } catch (error) {
      this.setState({
        showRealApp:false
      });
    }

   RNLanguages.addEventListener('change', this._onLanguagesChange);
   SplashScreen.hide()
  }

  
  componentWillUnmount() {

  }



  _onLanguagesChange = ({ language }) => {
    i18n.locale = language;
    this.setState({ currentLanguage: language });
  };
  render() {


    if (this.state.showRealApp==true) {
  
      if (!this.state.isReady) {
        return (
          <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="orange" />
        </View>
        );
      }
      return(
  <Root>
  <StyleProvider style={getTheme(commonColor)}>
    <ReloadAppOnLanguageChange />
  

      </StyleProvider>

  </Root>

  
  
  
  
      );
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }




    

  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  /**App Intro */
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
});
const slides = [
  {
    key: 's1',
    text: 'Form Survey vai App',
    title: 'Form Survey',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
    //  source=require('./assets/icons/white/survey.png')
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png',
    },
    imageStyle: styles.image,
    backgroundColor: 'orange',
  },
  {
    key: 's2',
    title: 'House Construction Awareness',
    titleStyle: styles.title,
    text: 'This App also provides awareness related to House Construction',
    image: {
     // source=require('../../assets/icon.png')
     uri:
     'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  }
];