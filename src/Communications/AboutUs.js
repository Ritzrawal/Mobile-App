import React from "react";
import { AppRegistry, Alert,StyleSheet,View,TouchableOpacity, Image, } from "react-native";

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
 
  
} from "native-base";
import { SuperGridSectionList } from 'react-native-super-grid';

export default class AboutUs extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header> 
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>AboutUs</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container>







                    <Card>
            <CardItem header bordered>
              <Text>Insurance App</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Image source={{uri: 'https://via.placeholder.com/50x50'}} style={styles.appLogo} />
                <Text>
                Insurance App is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered style={{
        justifyContent: 'space-around',}}>
            <Button transparent style={{flexDirection:"column"}}>
              <Icon name='share' />
              <Text>Share App</Text>
            </Button>
            <Button transparent style={{flexDirection:"column"}}>
              <Icon name='star' />
              <Text>Rate App</Text>
            </Button>
            <Button transparent style={{flexDirection:"column"}}>
              <Icon name='arrow-back' />
              <Text>Feedback</Text>
            </Button>
            </CardItem>
          </Card>

      </Container>
    );
  }
}
const styles = StyleSheet.create({
    appLogo:{
height:50,
width:50,
marginLeft: 100,
borderWidth:1,
justifyContent: 'center',
alignItems: 'center',
    },
    appTitle:{

    },
    appDescription:{

    }
});
