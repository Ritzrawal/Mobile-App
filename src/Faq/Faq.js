import React from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Linking,ScrollView
} from "react-native";

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Button,
  Title,
  Accordion,
  CardItem,Card
} from "native-base";
import { NavigationActions } from "react-navigation";
import Icons from "react-native-vector-icons/FontAwesome";

import { storage } from "../../App";
import { withNamespaces } from "react-i18next";

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export class FaqList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null

  });
  _renderHeader(item, expanded) {
    return (
      <Card>
 <View
        style={{
          flexDirection: "row",
          padding: 10,
         // justifyContent: "space-between",
         // alignItems: "center",
         // backgroundColor: "transparent",
        }}
      >
       <View style={styles.PickerLine} />
        <Text style={{ fontWeight: "600", color: "green",textAlign:'left' }}>
          {" "}{item.title}
        </Text>
        <View style={styles.PickerLine} />
        {expanded
          ?
          <Icons
          name="angle-up"
          size={25}
          style={{
            color: "orange",
//marginLeft: 15,
            marginTop: -2,
           // paddingRight: 10,
           justifyContent:'flex-end',
            fontWeight: "600"
          }}
        />
          :           <Icons
          name="angle-down"
          size={25}
          style={{
            color: "orange",
           // marginLeft: 15,
            marginTop: -2,
           // paddingRight: 10,
           justifyContent:'flex-end',
          
            fontWeight: "600"
          }}
        />}
      </View>

      </Card>
     
    );
  }
  _renderContent(item) {
    return (
      <Card>
        <CardItem>
        <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          //fontStyle: "italic",
        }}
      >
      <Icons name="arrow-left" />
        {item.content}
      </Text>
        </CardItem>
      </Card>
     
    );
  }
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      newsData: [],
      acc: []
    };
  }
  getData() {
    console.log("Get Data");
    console.log("into getData1");
    storage
      .load({
        key: "user",
        autoSync: true,
        syncInBackground: true
      })
      .then(res => {
        console.log("res data");
        console.log("Resdata" + JSON.stringify(res[1].title));
        //    if (this._isMounted) {
        //   console.log("is mounted"+ this._isMounted);
        this.setState(
          {
            newsData: res
            //  acc: this.state.acc.concat( { title:  res[1].title, content: res[1].body})
          },
          function() {
            console.log("DATA SET");
            // console.log(this.state.newsData);
            if (this.state.newsData && this.state.newsData.length > 0) {
              console.log('news data is here');
              this.state.newsData.map((key, index) => {
                console.log(this.state.newsData[index].title);

                this.setState(prevState => ({
                  acc: [...prevState.acc, {"title":this.state.newsData[index].title, 'content': this.state.newsData[index].body}]
                }),

                  function() {
                    console.log("set");
                    // console.log(this.state.newsData);
                  }
                );
              });
            }
          }
        );
        // }
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError":
            console.log("not found");
            alert("没有找到token");
            break;
          case "ExpiredError":
            alert("token失效");
            break;
        }
      });
    storage.sync = {
      // The name of the sync method must be the same as the data's key name
      // And the passed params will be an all-in-one object.
      // You can return a value or a promise here

      async user(params) {
        return (
          fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              return response.json();
            })
            .then(responseData => {
              // console.log("RESPONSE DATA" + JSON.stringify(responseData));
              //    return responseData;
              if (responseData) {
                storage.save({
                  key: "user",
                  //id,
                  data: responseData
                });
              }
            })
            // .then(data =>
            // console.log("data"+data.userId),
            //  data.forEach(data2 => {
            //  console.log(data2.title);
            //  })
            // )

            .catch(err => {
              console.log("fetch error" + err);
            })
        );
      }
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted == true) {
      this.getData();

 
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }
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
        <Title>FAQ</Title>
      </Body>
      <Right />
    </Header>
    <ScrollView>
      <Content  style={styles.FaqContainer}>
      <ListItem itemDivider>
              <Text style={styles.heading3}>Frequently Asked Questions</Text>
            </ListItem>
        <Accordion
          dataArray={this.dataArray}
          animation={true}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </Content>
      </ScrollView>
    </Container>

    );
  }
}
export default withNamespaces(['faq', 'common'], { wait: true })(FaqList);
const styles = StyleSheet.create({
  FaqContainer:{
   // justifyContent: "center",
    //marginTop: 0,
    padding: 20
  },
  heading3: {
    fontSize: 20,
    textAlign: "left",
    color: "red",
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo"
  },
  PickerLine: {
    borderBottomColor: "#aaa",
    borderBottomWidth: 0.5,
   // marginLeft: 15
  }
});
