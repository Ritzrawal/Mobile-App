import React from "react";
import {
  AppRegistry,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";

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
  Form,
  Item,
  Input,
  Label
} from "native-base";
// import OfflineNotice from '../Component/OfflineNotice'


import { withNamespaces,translate } from "react-i18next";

import Icons from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
export class StaffLoginScreen extends React.Component {
  _isMounted = false;
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      emailError: "",
      emailValidate: "",
      passwordValidate: "",
      passwordError: "",
      validateError: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        noShadow
        style={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          border: 0
        }}
        // androidStatusBarColor="#dc2015"
        iosBarStyle="light-content"
      >
        <Left>
          <Button
            transparent
            onPress={() => navigation.dispatch(NavigationActions.back())}
          >
            <Icons
              name="angle-left"
              size={40}
              style={{
                color: "orange",
                marginLeft: 15,
                marginTop: -2,
                paddingRight: 10
              }}
            />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
    )
  });

  signIn = async () => {
    if (this.state.email == "" || this.state.password == "") {
      console.log("Enter email and password");
    }

    JSON.stringify({
      email: this.state.email,

      password: this.state.password
    });
    console.log(
      JSON.stringify({ email: this.state.email, password: this.state.password })
    );
    this.props.navigation.navigate("Home");
      fetch('http://colapp.drcmp.org/api/checkuser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
        
      
          email: this.state.email,
      
          password: this.state.password
      
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
      
              if (responseJson == 'true') {
                Alert.alert(responseJson);
                 AsyncStorage.setItem("email",this.state.email);
                // AsyncStorage.setItem("userToken", this.state.email);
               // await AsyncStorage.setItem("Role", "Staff");
               
              }
              else{

              }
             
      
            }).catch((error) => {
              console.error(error);
            });
           
           

  };
  validate(text, type) {
    if (this._isMounted) {
      alph = /^(?=.{4,8}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      pass = /^(?=.{4,8}$)[a-zA-Z0-9]+(?:[-'\s][a-zA-Z0-9]+)*$/;
      if (type == "username") {
        if (alph.test(text)) {
          console.log("username" + text);
          this.setState({
            email: text,
            emailValidate: true,
            emailError: "",
            validateError: false
          });
          //  console.warn("1text is correct");
        } else {
          //   console.warn("invalid text");
          this.setState({
            email: text,
            emailValidate: false,
            emailError: "Enter correct username between 5 to 50 characters",
            validateError: true
          });
        }
      }

      if (type == "password") {
        console.log("password" + text);
        if (pass.test(text)) {
          this.setState({
            password: text,
            passwordValidate: true,
            passwordError: "",
            validateError: false
          });
          // console.warn("2text is correct");
        } else {
          //  console.warn("invalid text");
          this.setState({
            password: text,
            passwordValidate: false,
            passwordError: "Enter password between 4 to 8 characters",
            validateError: false
          });
        }
      }
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <Container style={{ color: "white" }}>

        <Content padder>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../assets/icon.png")}
              style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                justifyContent: "center"
                // position: "absolute"
              }}
            />

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 0,
                  width: 200,
                  color: "orange",
                  paddingTop: 10,
                  paddingBottom: 10
                }}
              >
                Construction App
              </Text>
            </View>
          </View>
          <View>
            <Form>
              <Item regular>
                <Icons
                  name="envelope"
                  size={16}
                  style={{
                    color: "orange",
                    marginLeft: 15,
                    marginTop: -2,
                    paddingRight: 10
                  }}
                />

                <Input
                  placeholder= {t('login_form:username')}
                  /*style={[
                    styles.inputStyle,
                    !this.state.emailValidate ? styles.error : null
                  ]}*/
                  onChangeText={text => this.validate(text, "username")}
                />
              </Item>
              {this.state.emailError != "" ? (
                <Label>{this.state.emailError}</Label>
              ) : (
                <Label />
              )}

              <Item regular>
                <Icons
                  name="key"
                  size={16}
                  style={{
                    color: "orange",
                    marginLeft: 15,
                    marginTop: -2,
                    paddingRight: 10
                  }}
                />

                <Input
                  secureTextEntry={true}
                  placeholder={t('login_form:password')}
                  style={[
                    styles.inputStyle,
                    !this.state.emailValidate ? styles.error : null
                  ]}
                  onChangeText={text => this.validate(text, "password")}
                />
              </Item>
              {this.state.passwordError != "" ? (
                <Label>{this.state.passwordError}</Label>
              ) : (
                <Label />
              )}

              <Content style={{ flexDirection: "column", flex: 1 }}>
                {this.state.password != "" &&
                this.state.passwordValidate == true &&
                (this.state.email != "" && this.state.emailValidate == true) ==
                  true ? (
                  <View>
                    <Button
                      warning
                      rounded
                      style={{ marginTop: 50, flex: 1 }}
                      onPress={() => {
                        this.signIn();
                      }}
                    >
                      <Icon active name="chatbubbles" />
                      <Text>{t('login_form:login')}</Text>
                    </Button>
                  </View>
                ) : (
                  <View>
                    <Button
                      warning
                      disabled
                      rounded
                      style={{ marginTop: 50, flex: 1 }}
                      onPress={() => {
                        this.signIn();
                      }}
                    >
                      <Icons
                        name="sign-in"
                        size={16}
                        style={{
                          color: "grey",
                          marginLeft: 15,
                          marginTop: -2,
                          paddingRight: 10
                        }}
                      />
                      <Text>{t('login_form:login')}</Text>
                    </Button>
                  </View>
                )}
              </Content>
            </Form>
          </View>
        </Content>
        {/* <OfflineNotice /> */}
      </Container>
    );
  }
}
export default withNamespaces(['login', 'common'], { wait: true })(StaffLoginScreen);
const styles = StyleSheet.create({
  inputStyle: {},
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1
  },
  error: {
    color: "red"
    /*borderWidth:3,
    borderColor: 'red',*/
  }
});
