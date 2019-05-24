import React, {Component} from 'react';

import { StyleSheet, View, Dimensions, Image } from 'react-native';

import { Container, Form, Item, Input, Label, Textarea, Button, Text } from 'native-base';
import {  List, ListItem, Left, Right, Body,Header,Title,Icon as IconNB } from 'native-base';
import { NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import {Toast} from 'antd-mobile';

var {height, width} = Dimensions.get('window');
import { withNamespaces,translate } from "react-i18next";
import Toast from 'react-native-root-toast';
export class ContactUs extends Component {
  static navigationOptions = {
    header: null
  };
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserName: '',
      UserEmail: '',
      UserPhone: '',
      UserMessage: '',
      visible: false
 
    }
 }
 componentDidMount() {
  setTimeout(() => this.setState({
      visible: true
  }), 2000); // show toast after 2s

  setTimeout(() => this.setState({
      visible: false
  }), 5000); // hide toast after 5s
};
 UserRegistrationFunction = () =>{
 
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserMessage }  = this.state ;
 const { UserPhone }  = this.state ;
 
fetch('http://phlapp.drcmp.org/api/contactmsg', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    name: UserName,
 
    email: UserEmail,

    phone: UserPhone,
 
    message: UserMessage
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        console.log('res'+responseJson);
console.log("ResponseJson"+JSON.stringify(responseJson));
        if (responseJson.message == 'Success') {
          return(

            <Toast
            visible={this.state.visible}
            position={50}
            shadow={false}
            animation={false}
            hideOnPress={true}
        >Successfully Send</Toast>
          );

        }else{
          //Toast.info(Strings.ST74, 1)
          return(

            <Toast
            visible={this.state.visible}
            position={50}
            shadow={false}
            animation={false}
            hideOnPress={true}
        >Problem in sending Data.Please Try Again</Toast>
          );
         
          // this.props.navigation.goBack()
        }

      }).catch((error) => {
        console.log(error);

      });
 
 
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
          <Title>{t('contact_us:title')}</Title>
        </Body>
        <Right />
      </Header>
    <KeyboardAwareScrollView>

<View style={{flex: 1, margin: 15}}>

<View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../../assets/icons/blog.png')} style={{width: 100, height: 100, marginTop: 10}} />
</View>

<Text style={{paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight:'bold', textAlign: 'center' }}>
{t('contact_us:help_text1')}
</Text>

<Text style={{color: '#888888', fontSize: 14, textAlign: 'center'}}>
{t('contact_us:help_text2')}
</Text>

<Form style={{marginBottom: 35, marginTop: 25}}>
            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{t('contact_us:full_name')}</Label>
              <Input onChangeText={UserName => this.setState({UserName})} style={{fontSize: 15}} />
            </Item>

            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{t('contact_us:email_address')}</Label>
              <Input onChangeText={UserEmail => this.setState({UserEmail})} style={{fontSize: 15}} autoCapitalize="none" />
            </Item>

            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{t('contact_us:phone')}</Label>
              <Input onChangeText={UserPhone => this.setState({UserPhone})} style={{fontSize: 15}} autoCapitalize="none" />
            </Item>

            <Textarea rowSpan={3} bordered placeholder={t('contact_us:send')} placeholderTextColor="#888888" onChangeText={UserMessage => this.setState({UserMessage})} style={{fontSize: 15, marginTop: 15, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}} />

</Form>


<Button block rounded onPress={this.UserRegistrationFunction} style={styles.button_auth}>
<Text>Send</Text>
</Button>
</View>
    </KeyboardAwareScrollView>

</Container>

    )
  }

}
export default withNamespaces(['about_us', 'common'], { wait: true })(ContactUs);
const styles = StyleSheet.create({
  background_general:{
    backgroundColor: '#FFF'
    },
    button_auth:{
      minWidth: 200,
      backgroundColor: 'orange',
      marginBottom: 8,
      height: 53,
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
      shadowOffset: {
        width: 0,
        height: 0
      }
      },
      
});