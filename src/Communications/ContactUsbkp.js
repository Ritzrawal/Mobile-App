import React from "react";
import {
  AppRegistry,
  Platform,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  NetInfo,
  Dimensions
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
  Label,
  Picker,
  DatePicker,
  CheckBox,
  Radio,
  ListItem,
  List
} from "native-base";

import { Constants, Location, Permissions, MapView } from "expo";
const { width } = Dimensions.get('window');
export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: "",
      selectedValue: "",

      selectedTechnology: "",
      technologyType: [
        { name: "Confined Masonry", id: 1 },
        { name: "Timber", id: 2 }
      ],
      selectedType: "",
      selectedFloor: "",
      floorType: [{ name: "1 Floor", id: 1 }, { name: "2 Floor", id: 2 }],
      selectedHouse: "",
      houseType: [
        { name: "Type 36", id: 1 },
        { name: "Type 45", id: 2 },
        { name: "Type 54", id: 3 }
      ],
      selectedBedroom: "",
      selectedBedroom36: "",
      bedroom36: [{ name: "1 bedroom", id: 1 }, { name: "2 bedroom", id: 2 }],
      bedroom45: [{ name: "2 bedroom", id: 1 }, { name: "3 bedroom", id: 2 }],
      bedroom54: [{ name: "3 bedroom", id: 1 }, { name: "4 bedroom", id: 2 }],
      bedroomType: [
        { name: "Type 36", id: 1 },
        { name: "Type 45", id: 2 },
        { name: "Type 54", id: 3 }
      ],
      selectedToilet: "",
      toiletType: [{ name: "Inside", id: 1 }, { name: "Outside", id: 2 }],
      selectedInsideOutside: "",
      selectedLotSize: "",
      LotSizeType: [
        { name: "49 m2", id: 1 },
        { name: "75 m2", id: 2 },
        { name: "88 m2", id: 3 }
      ],
      frontTerrace: false,
      backTerrace: false,
      sideTerrace: false,
      location: null,
      errorMessage: null,
      isConnected: true
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        style={{backgroundColor: "#FF5E3A" }}
        iosBarStyle="light-content"
      >
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Construction Library</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
   MiniOfflineSign() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }

  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  handleChangeOption(val, type) {
    console.log("value" + val + "type" + type);
    if (val !== 0) {
      // this.setState({selectedValue: val});
      this.setState({
        selectedValue: val
      });
      if (type == "technology") {
        this.setState({
          selectedTechnology: val
        });
      }
      if (type == "floor") {
        this.setState({
          selectedFloor: val
        });
      }
      if (type == "house") {
        this.setState({
          selectedHouse: val
        });
      }
      if (type == "type") {
        this.setState({
          selectedType: val
        });
      }
      if (type == "bedroom") {
        this.setState({
          selectedBedroom: val
        });
      }
      if (type == "toilet") {
        this.setState({
          selectedToilet: val
        });
      }
      if (type == "lotsize") {
        this.setState({
          selectedLotSize: val
        });
      }
      if (type == "insideoutside") {
        this.setState({
          selectedInsideOutside: val
        });
      }
    }
  }
  formSubmit = async () => {
    let missingField;
    if (this.state.selectedTechnology == "") {
      missingField += "Select Technology\n";
    }
    if (this.state.selectedFloor == "") {
      missingField += "Select Floor\n";
    }
    if (this.state.selectedHouse == "") {
      missingField += "Select House\n";
    }
    if (this.state.selectedBedroom == "") {
      missingField += "Select Bedroom\n";
    }
    if (this.state.selectedToilet == "") {
      missingField += "Select Toilet\n";
    }
    if (this.state.selectedLotSize == "") {
      missingField += "Enter Select LotSize\n";
    }
    this.setState({
      missingError: missingField
    });

    JSON.stringify({
      technology: this.state.selectedTechnology,
      floor: this.state.selectedFloor,
      house: this.state.selectedHouse,
      bedroom: this.state.selectedBedroom,
      toilet: this.state.selectedToilet,
      lotsize: this.state.selectedLotSize
    });

    var data = new FormData();
    data.append("technology", this.state.selectedTechnology);
    data.append("floor", this.state.selectedFloor);
    data.append("house", this.state.selectedHouse);
    data.append("bedroom", this.state.selectedBedroom);
    data.append("toilet", this.state.selectedToilet);
    data.append("lotsize", this.state.selectedLotSize);

    fetch(url, {
      method: "post",
      body: data
    }).then(res => {
      console.log(res);
    });

    /*  fetch('https://gabbarseang.000webhostapp.com/user_login.php', {
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
      
      
              Alert.alert(responseJson);
      
            }).catch((error) => {
              console.error(error);
            });*/
    //  await AsyncStorage.setItem('userToken', 'sakar');
    // await AsyncStorage.setItem('Role', 'Staff');

    // this.props.navigation.navigate('Home')
  };

  render() {
    let text = "Waiting..";
    let latitude = "";
    let longitude = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      //  text = JSON.stringify(this.state.location);
      latitude = JSON.stringify(this.state.location.coords.latitude);
      longitude = JSON.stringify(this.state.location.coords.longitude);
      console.log(text);
    }
/*    if (!this.state.isConnected) {
      return this.MiniOfflineSign();
    }*/
    return (

      <Container>
        <Content padder>
          <Item stackedLabel style={styles.PickerLabel}>
            <Label>Technology</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedTechnology}
            onValueChange={e => this.handleChangeOption(e, "technology")}
          >
           <Picker.Item label="Please select Technology" value="0" />
            {this.state.technologyType.map((technologyType, i) => {
              return (
                <Picker.Item
                  iosHeader="Selecione"
                  label={technologyType.name}
                  value={technologyType.id}
                  key={i}
                />
              );
            })}
          </Picker>
          <View style={styles.PickerLine} />

          <Item stackedLabel style={styles.PickerLabel}>
            <Label>Number of Floor</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedFloor}
            onValueChange={e => this.handleChangeOption(e, "floor")}
          >
            <Picker.Item label="Please select Floor" value="0" />
            {this.state.floorType.map((floorType, i) => {
              return (
                <Picker.Item
                  label={floorType.name}
                  value={floorType.id}
                  key={i}
                />
              );
            })}
          </Picker>
          <View style={styles.PickerLine} />

          <Item stackedLabel style={styles.PickerLabel}>
            <Label>Type of House</Label>
          </Item>
          <Picker
            placeholder="Select House Type"
            style={styles.Picker}
            selectedValue={this.state.selectedHouse}
            onValueChange={e => this.handleChangeOption(e, "house")}
          >
            <Picker.Item label="Please select House" value="0" />
            {this.state.houseType.map((houseType, i) => {
              return (
                <Picker.Item
                  label={houseType.name}
                  value={houseType.id}
                  key={i}
                />
              );
            })}
          </Picker>
          <View style={styles.PickerLine} />

          {this.state.selectedHouse == 1 ? (
            <View>
              <Item stackedLabel style={styles.PickerLabel}>
                <Label>Type of Bedroom</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label="Please select Bedroom" value="0" />
                {this.state.bedroom36.map((bedroom36, i) => {
                  return (
                    <Picker.Item
                      label={bedroom36.name}
                      value={bedroom36.id}
                      key={i}
                    />
                  );
                })}
              </Picker>
              <View style={styles.PickerLine} />
            </View>
          ) : this.state.selectedHouse == 2 ? (
            <View>
              <Item stackedLabel style={styles.PickerLabel}>
                <Label>Type of Bedroom</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label="Please select Bedroom" value="0" />
                {this.state.bedroom45.map((bedroom45, i) => {
                  return (
                    <Picker.Item
                      label={bedroom45.name}
                      value={bedroom45.id}
                      key={i}
                    />
                  );
                })}
              </Picker>
              <View style={styles.PickerLine} />
            </View>
          ) : this.state.selectedHouse == 3 ? (
            <View>
              <Item stackedLabel style={styles.PickerLabel}>
                <Label>Type of Bedroom</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label="Please select Bedroom" value="0" />
                {this.state.bedroom54.map((bedroom54, i) => {
                  return (
                    <Picker.Item
                      label={bedroom54.name}
                      value={bedroom54.id}
                      key={i}
                    />
                  );
                })}
              </Picker>
              <View style={styles.PickerLine} />
            </View>
          ) : null}

          <Item stackedLabel style={styles.PickerLabel}>
            <Label>Toilet Access</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedToilet}
            onValueChange={e => this.handleChangeOption(e, "toilet")}
          >
          <Picker.Item label="Please select Toilet" value="0" />
            {this.state.toiletType.map((toiletType, i) => {
              return (
                <Picker.Item
                  label={toiletType.name}
                  value={toiletType.id}
                  key={i}
                />
              );
            })}
          </Picker>
          <View style={styles.PickerLine} />
          <Item stackedLabel style={styles.PickerLabel}>
            <Label>Terrace Location</Label>
          </Item>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CheckBox
              style={styles.DatePickerText}
              color="green"
              onPress={() =>
                this.setState({
                  frontTerrace: !this.state.frontTerrace
                })
              }
              checked={this.state.frontTerrace}
            />
            <Text style={{ marginLeft: 10, paddingLeft: 10 }}>
              Front Terrace
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CheckBox
              style={styles.DatePickerText}
              color="green"
              onPress={() =>
                this.setState({
                  backTerrace: !this.state.backTerrace
                })
              }
              checked={this.state.backTerrace}
            />
            <Text style={{ marginLeft: 10, paddingLeft: 10 }}>
              Back Terrace
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CheckBox
              style={styles.DatePickerText}
              color="green"
              onPress={() =>
                this.setState({
                  sideTerrace: !this.state.sideTerrace
                })
              }
              checked={this.state.sideTerrace}
            />
            <Text style={{ marginLeft: 10, paddingLeft: 10 }}>
              Side Terrace
            </Text>
          </View>

          <View>
            <Item stackedLabel style={styles.PickerLabel}>
              <Label>Lot Size</Label>
            </Item>
            <Picker
              style={styles.Picker}
              selectedValue={this.state.selectedLotSize}
              onValueChange={e => this.handleChangeOption(e, "lotsize")}
            >
            <Picker.Item label="Please select LotSize" value="0" />
              {this.state.LotSizeType.map((lotSize, i) => {
                return (
                  <Picker.Item
                    label={lotSize.name}
                    value={lotSize.id}
                    key={i}
                  />
                );
              })}
            </Picker>
            <View style={styles.PickerLine} />
          </View>

          <Item stackedLabel>
            <Label>Latitude</Label>
            <Input value={latitude} disabled />
          </Item>
          <View style={styles.PickerLine} />

          <View style={styles.PickerLine} />

          <Item stackedLabel>
            <Label>Longitude</Label>
            <Input value={longitude} disabled />
          </Item>
          <View style={styles.PickerLine} />
          <View>
            {/**
              * <MapView coordinate={this.state.location.coords} title="My Marker" description="Some description" />

              */}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >

            {
              this.state.isConnected?
              <Button primary style={styles.centerButton}>
              <Text> Submit </Text>
            </Button>
              :
              <Button primary style={styles.centerButton}>
              <Text> Submit Later </Text>
            </Button>
            }

          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    color: "#fff",
    fontSize: 20
  },
  headerText: {
    color: "#fff",
    fontSize: 14
  },
  logo: {
    width: 50,
    height: 50
  },
  PickerLabel: {
    borderColor: "transparent",
    height: 30
  },
  Picker: {
    marginTop: -5,
    marginLeft: 9,
    paddingBottom: 10,
    borderWidth: 1,
    borderBottomColor: "gray"
  },
  PickerLine: {
    borderBottomColor: "#aaa",
    borderBottomWidth: 0.5,
    marginLeft: 15
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});
