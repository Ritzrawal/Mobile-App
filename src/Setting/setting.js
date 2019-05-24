import React, {Component} from 'react';

import { NavigationActions } from 'react-navigation';
import{StyleSheet,TouchableOpacity, Dimensions, View, Image, ScrollView, Linking} from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Text, List, ListItem, Left, Right, Body,Header,Title,Button,Icon as IconNB } from 'native-base';

var {height, width} = Dimensions.get('window');
import Icon2 from "react-native-vector-icons/AntDesign";
import { withNamespaces,translate } from "react-i18next";
export class Settings extends Component {
static navigationOptions = {
  header:null
};


constructor(props) {

    super(props);

    this.state = {
      loading: true
    }

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (

<Container style={styles.background_general}>
<Header>
      <Left>
      <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
          <IconNB name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{t('setting:title')}</Title>
      </Body>
      <Right />
    </Header>
<ScrollView>
<Grid>

<Row style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#FFF', height: height * 0.30, padding:30, paddingBottom: 0}}>
<Image
      source={require('../../assets/icon.png')}
      style={{flex: 1, width: 130, height: 130}}
      resizeMode='contain'/>
</Row>

</Grid>

<View style={{padding: 45, paddingTop: 30}}>

<List>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0.5}} onPress={this.navigateToScreen('AboutUs')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{t('setting:about_us')}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              
              <Icon2
                          style={{ flex: 1 }}
                          size={16}
                          color="grey"
                          name="right"
                        />
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0.5}} onPress={this.navigateToScreen('ContactUs')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{t('setting:contact_us')}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
          
              </Right>
            </ListItem>

            <ListItem icon style={{marginLeft: 0, borderBottomWidth: 0.5}} onPress={this.navigateToScreen('Privacy')}>
              <Left style={{borderBottomWidth: 0}}>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{t('setting:privacy_terms')}</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
              </Right>
            </ListItem>
     
          </List>

</View>

<View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 10}}>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://facebook.com')}}><Icon name="facebook-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://youtube.com')}}><Icon name="youtube-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://twitter.com')}}><Icon name="twitter-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>
<TouchableOpacity onPress={ ()=>{ Linking.openURL('https://instagram.com')}}><Icon name="instagram-with-circle" style={{fontSize: 46, width: 50, height: 50}} color="#f39c12"/></TouchableOpacity>

</View>

</ScrollView>

</Container>

    )
  }

}
export default withNamespaces(['setting', 'common'], { wait: true })(Settings);
const styles = StyleSheet.create({
  background_general:{
    backgroundColor: '#FFF'
    }
});