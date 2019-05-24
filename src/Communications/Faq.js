import React, { Component } from "react";
import { Container, Header, Content, Accordion, View, Text,Icon ,Left,Right,Body,Button,Title} from "native-base";


const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
console.log(typeof dataArray);
export default class Faq extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Faq</Title>
                </Body>
                <Right />
            </Header>
        )
    });
  render() {
    return (
      <Container>
     
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