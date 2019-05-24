import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationActions } from "react-navigation";
export default class FirstScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  render(){
    
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right />
        </Header>
      <View style={styles.container}>
      <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('')}
        >
          <Text style={styles.customBtnText}>8 Build Back Safer Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customBtnBG1}
          onPress={() => this.props.navigation.navigate('')}
        >
          <Text style={styles.customBtnText}>3 C’s of Construction</Text>
        </TouchableOpacity>
      
        
        </View>
        </Container>

    )
  }
}
const styles = StyleSheet.create({
  container: {
        
        width:'100%',
        height:"100%",
    alignItems: "center"
  },
  /* Here style the text of your button */
    customBtnText: {
        fontSize: 25,
        fontWeight: '300',
        alignItems: "center",
       

        color: "#fff",
    },
     customBtnBG: {
    backgroundColor: "#9b59b6",
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginTop:20,
    borderRadius: 10,
    width:'90%',
    },
    customBtnBG1: {
      backgroundColor: "#27ae60",
      paddingHorizontal: 30,
      paddingVertical: 5,
      marginTop:20,
      borderRadius: 10,
      width:'90%',
      },
     
          
})