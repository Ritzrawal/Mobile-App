import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {Thumbnail} from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome";

import { withNamespaces,translate } from "react-i18next";




export class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: ""
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("email").then(value =>
      this.setState({ loggedIn: value })
    );
  }
  componentWillReceiveProps() {
    AsyncStorage.getItem("email").then(value =>
      this.setState({ loggedIn: value })
    );
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
 
    
    
    

    const routes3 = [
      {title: t('sidebar:home'), icon: "home", link: "HomeScreen" },  
      {title: t('sidebar:How_safe_is_my_house'), icon: "home", link: "OmpongNavigator" }, 
      {title: t('sidebar:How_to_strengthen_my_house'), icon: "anchor", link: "DocumentNavigator" },
      {title: t('sidebar:site_safety'), icon: "check-circle", link: "SafetyNavigator" },
      {title: t('sidebar:Material_Quality'), icon: "exclamation-triangle", link: "RiskNavigator" }, 
      {title: t('sidebar:Refrences'), icon: "copy", link: "FinancialNavigator" },
      {title: t('sidebar:faq'), icon: "envelope-open", link: "FaqNavigator" }
 
    ];
    return (
      <View style={styles.container}>
        {/* {this.forceUpdate()} */}
        {this.state.loggedIn == null ? (
          <View style={styles.headerContainer}>
            {/* {AsyncStorage.getItem('email').then((value) =>this.setState({ loggedIn: value }))} */}
            {/* <TouchableOpacity
              activeOpacity={0.3}
              style={styles.touchHeader}
              onPress={this.navigateToScreen("LoginStackNavigator")}
            >
              <View
                style={{ flex: 7, flexDirection: "column", marginLeft: 15 }}
              >
                <Text style={styles.headerText}>{t('sidebar:log_in')} </Text>
              </View>
              <View style={{ flex: 1, position: "absolute", right: 15 }}>
                <Icon2
                  size={20}
                  color="white"
                  name="chevron-right"
                />
              </View>
            </TouchableOpacity> */}
             {/* <View
                style={{ flex: 7, flexDirection: "column", marginLeft: 15 }}
              > */}
            <Thumbnail style={{marginLeft:10,marginTop:5}}
                    source={require("../../assets/icons/newimges.png")}
                  />
                  {/* </View> */}
          </View>
        ) : (
          <View style={styles.headerContainer}>
            <View
              activeOpacity={0.3}
              style={styles.touchHeader}
              // onPress={this.navigateToScreen('Logout')}
            >
              <View
                style={{ flex: 2, flexDirection: "column", marginLeft: 15 }}
              >
                <Icon2 size={60} color="white" name="user-circle" />
              </View>
              <View
                style={{ flex: 6, flexDirection: "column", marginLeft: 15 }}
              >
                <Text style={styles.headerText}>{this.state.loggedIn}</Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1, position: "absolute", right: 15 }}
                onPress={() => {
                  AsyncStorage.removeItem("email").then(alert("Logged Out"));
                  this.setState({ loggedIn: null });
                  this.forceUpdate();
                }}
              >
                <View>
                  <Font size={30} color="white" name="logout" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={{ width: "100%", height: "85%", backgroundColor: "#EEEEEE" }}
        >
          <ScrollView>
            <View style={styles.sectionA}>

              {routes3.map((prop, key) => {
            
                return (
                  <View style={[styles.screenStyle, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      activeOpacity={0.3}
                      style={styles.touchItems}
                      onPress={this.navigateToScreen(prop.link)}
                    >
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Icon2
                          style={{ flex: 1 }}
                          size={24}
                          color="grey"
                          name={prop.icon}
                        />
                        <Text style={[styles.screenTextStyle, { flex: 4 }]}>
                          {prop.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}


            </View>

            <View style={styles.sectionC}>
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.screenStyle}
                onPress={this.navigateToScreen("SettingNavigator")}
              >
                <Text style={styles.screenTextStyle}>{t('sidebar:help')}</Text>
              </TouchableOpacity>

              <View style={styles.screenStyle}>
                <Text style={{ fontSize: 10, color: "rgba(0,0,0,0.7)" }}>
                  version 1.0.0
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default withNamespaces(['sidebar', 'common'], { wait: true })(Sidebar);
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%"
  },
  headerContainer: {
    width: "100%",
    height: "10%",
   // backgroundColor: "rgb(84, 161, 40)",
   backgroundColor:'#3F51B5',
    // justifyContent: "center",
    // alignItems: "center"
  },
  touchHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#fff8f8",
    fontSize: 16,
    alignSelf: "flex-start"
  },
  headerTextSub: {
    color: "#fff8f8",
    alignSelf: "flex-start"
  },
  screenContainer: {
    paddingTop: 20
  },
  screenStyle: {
    // height: 30,
    paddingVertical: 15,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  touchItems: {
    flexDirection: "row"
  },
  screenTextStyle: {
    fontSize: 16,
    // marginLeft: 20
    color: "black",
    width: "100%"
  },
  sectionA: {
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    flexDirection: "column",
    justifyContent: "center"
    // alignItems: 'center',
    // paddingLeft: 20,
  },
  sectionB: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    flexDirection: "column",
    justifyContent: "center"
    // alignItems: 'center',
    // paddingLeft: '20',
  },
  sectionC: {
    width: "100%",

    flexDirection: "column",
    justifyContent: "center"
    // alignItems: 'center',
    // position:'absolute',
    // paddingLeft: '20',
  }
});
