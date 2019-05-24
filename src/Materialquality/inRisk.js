import React from "react";
import { AppRegistry, Alert, StyleSheet,View, TouchableOpacity,Linking } from "react-native";

import { Container, Header, Content, Accordion,  Text,Icon ,Left,Right,Body,Button,Title} from "native-base";

import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
export class InRisk extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
 
 
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (
        <Container>
           <Header>
        <Left>
        <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{t("in_risk:title")}</Title>
        </Body>
        <Right />
      </Header>
        <Content padder>
          <Accordion
            dataArray={dataArray}
            headerStyle={{ backgroundColor: "#b7daf8" }}
            contentStyle={{ backgroundColor: "#ddecf8" }}
           
          />
         
        </Content>
      </Container>
    );
  }
}
export default withNamespaces(['in_risk', 'common'], { wait: true })(InRisk);
const styles = StyleSheet.create({

});
