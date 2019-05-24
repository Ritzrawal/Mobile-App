import React from "react";
import { AppRegistry, Alert,StyleSheet,View,TouchableOpacity,List,ListItem,ScrollView } from "react-native";

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
  H1
} from "native-base";
import { SuperGridSectionList } from 'react-native-super-grid';

export default class Branches extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header> 
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Branches</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container>
          <ScrollView>
          <Card>
            <CardItem header bordered>
              <Text>NewRoad Branch</Text>
            </CardItem>
            <CardItem>
              <Body>
              <CardItem>
              <Icon active name="md-time" />
              <Text>Phone: +977 01 222222</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Fax: +977 01 222222</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Incharge: Sakar Aryal</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Mobile No: +977 9838389</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Email Address: imsakararyal@gmail.com</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
              </Body>
            </CardItem>
            <CardItem footer bordered style={{flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',}}>
  
              <Text>Send Mail</Text>
              <Text>Make a Call</Text>
              <Text>Get Direction</Text>
            </CardItem>
         </Card>
         <Card>
            <CardItem header bordered>
              <Text>NewRoad Branch</Text>
            </CardItem>
            <CardItem>
              <Body>
              <CardItem>
              <Icon active name="md-time" />
              <Text>Phone: +977 01 222222</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Fax: +977 01 222222</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Incharge: Sakar Aryal</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Mobile No: +977 9838389</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
              <Icon active name="md-time" />
              <Text>Email Address: imsakararyal@gmail.com</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
              </Body>
            </CardItem>
            <CardItem footer bordered style={{flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',}}>
  
              <Text>Send Mail</Text>
              <Text>Make a Call</Text>
              <Text>Get Direction</Text>
            </CardItem>
         </Card>

          </ScrollView>
         </Container>
    );
  }
}
const styles = StyleSheet.create({
  CardItem:{
      height:10,
      padding: 0,
  },
  Card:{
      marginBottom: 20,
  }
});
