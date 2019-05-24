import React, {Component} from 'react';



import{TouchableOpacity, Dimensions, View, Image, FlatList, ScrollView,ActivityIndicator,WebView,StyleSheet} from 'react-native';

import { Container, Text,Header,Left,Button,Icon as IconNB,Body,Title,Right} from 'native-base';

import { NavigationActions } from "react-navigation";




var {height, width} = Dimensions.get('window');
const PolicyHTML = require('../../assets/privacy_policy.html');

export default class Privacy extends Component {
  static navigationOptions = {
    header:null 
   };

constructor(props) {

    super(props);

    this.state = {
      isLoading: false
    }

  }
/*
  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_strings.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

*/
  render () {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;


    return (


<Container>
<Header>
        <Left>
        <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
            <IconNB name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Privacy</Title>
        </Body>
        <Right />
      </Header>

      {
  
        
        <View style={{flex: 1}}>
    <WebView
      style={{flex: 1}}
    //  source={require("./resources/index.html")}
    source={PolicyHTML}
    />
</View>
        
      }

</Container>



    )
  }

}
const styles = StyleSheet.create({
	preloader:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		backgroundColor: '#FFFFFF',
  },
  background_general:{
    backgroundColor: '#FFF'
    }
})
