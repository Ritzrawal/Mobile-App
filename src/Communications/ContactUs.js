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
  List,Toast
} from "native-base";
import { NavigationActions } from "react-navigation";

//import { Constants, Location, Permissions, MapView } from "expo";
import { storage } from "../../App";

//const { width } = Dimensions.get("window");
import { withNamespaces } from "react-i18next";

export class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    const { t, i18n, navigation } = this.props;
    this.state = {
      isConnected: true,
      selectedValue: "",

      selectedTechnology: "",
      technologyType: [
        { name: t('construction_library:confined_masonry'), id: 1 },
        { name: t('construction_library:timber'), id: 2 }
      ],
      selectedType: "",
      selectedFloor: "",
      floorType: [{ name: t('construction_library:one_floor'), id: 1 }, { name: t('construction_library:two_floor'), id: 2 }],
      selectedHouse: "",
      houseType: [
        { name: t('construction_library:type_36'), id: 1 },
        { name: t('construction_library:type_45'), id: 2 },
        { name: t('construction_library:type_54'), id: 3 }
      ],
      selectedBedroom: "",
      selectedBedroom36: "",
      bedroom36: [{ name: t('construction_library:one_bedroom'), id: 1 }, { name: t('construction_library:two_bedroom'), id: 2 }],
      bedroom45: [{ name: t('construction_library:two_bedroom'), id: 1 }, { name: t('construction_library:three_bedroom'), id: 2 }],
      bedroom54: [{ name: t('construction_library:three_bedroom'), id: 1 }, { name: t('construction_library:four_bedroom'), id: 2 }],
      bedroomType: [
        { name:t('construction_library:type_36'), id: 1 },
        { name: t('construction_library:type_45'), id: 2 },
        { name: t('construction_library:type_54'), id: 3 }
      ],
      selectedToilet: "",
      toiletType: [{ name: t('construction_library:inside'), id: 1 }, { name: t('construction_library:outside'), id: 2 }],
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
      //   isConnected: true,
      hasOnlineData: null,
      isMounted: false,
      showToast: true,

      latitude: null,
      longitude: null,
      error: null,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
 
    header: null
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


  setData(bed,floor,house,lotSize,techn,toilet){
    this.setState({
      hasOnlineData: true,
      selectedBedroom:bed,
      selectedFloor:floor,
      selectedHouse:house,
      selectedLotSize:lotSize,
      selectedTechnology:techn,
      selectedToilet:toilet,

    }, function () {
      console.log("selected tech" +this.state.selectedTechnology);
  })
  }
  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
console.log("location"+location);
      //  this.setState({ location },console.log);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    this.setState({isMounted: true})
   /* storage.remove({
      key: 'formData'
    });*/






    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        },
        console.log("lat"+this.state.latitude));
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    //if (this.state.isMounted) {
      console.log("into the component");

      storage
      .load({
        key: 'formData',
    

      })
      .then(ret => {
     //   this.setState({ selectedTechnology: ret });
        console.log(ret);
       // const { bed, floor, house,lotsize,techn,toilet } = ret;
       const bed=ret.bedroom;
       console.log("bed"+bed);
       const floor=ret.floor;
       console.log("floor"+floor);
       const house=ret.house;
       console.log("house"+house);
       const lotsize=ret.lotsize;
       console.log("lotSize"+lotsize);
       const techn=ret.technology;
       console.log("techn"+techn);
       const toilet=ret.toilet;
       console.log("toilet"+toilet);
      this.setData( bed, floor, house,lotsize,techn,toilet);


      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
      //  console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
          console.log("notfound error");
          this.setState({ hasOnlineData: false });
          console.log("hasonlinedate set false");
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            console.log("notfound error");
            this.setState({ hasOnlineData: false });
            console.log("hasonlinedate set false");
            break;
        }
      });

        // }

    

    }
  componentWillMount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    /*if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
    //  this._getLocationAsync();
    }*/
    this.setState({isMounted: false});
    // this.setState({Balance:""})
    
  }
  /*
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
*/
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
    console.log("into the submit form");
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
    storage.remove({
      key: 'formData'
    });
console.log('remove sucessfully');
    var data = new FormData();
    data.append("technology", this.state.selectedTechnology);
    data.append("floor", this.state.selectedFloor);
    data.append("house", this.state.selectedHouse);
    data.append("bedroom", this.state.selectedBedroom);
    data.append("toilet", this.state.selectedToilet);
    data.append("lotsize", this.state.selectedLotSize);

  /*  fetch(url, {
      method: "post",
      body: data
    }).then(res => {
      console.log(res);
    });
*/
    
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

  submitLater = async () => {
    console.log("into the submit later");
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

    storage.remove({
      key: 'formData'
    });
    storage.save({
      key: "formData", // Note: Do not use underscore("_") in key!
      data: {
        technology: this.state.selectedTechnology,
        floor: this.state.selectedFloor,
        house: this.state.selectedHouse,
        bedroom: this.state.selectedBedroom,
        toilet: this.state.selectedToilet,
        lotsize: this.state.selectedLotSize
      },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });
   // this.props.goBack();
    console.log("sucessfully saved form");
  };
  render() {
    let text = "Waiting..";
    let latitude = "";
    let longitude = "";
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
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
    //   this.checkData()
        return (
      <Container>
              <Header>
        <Left>
        <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 2}}>
          <Title>{t('construction_library:title')}</Title>
        </Body>
        <Right />
      </Header>
        <Content padder>
          {this.state.hasOnlineData == false ||
          this.state.hasOnlineData == null ? (
          // <Text>Fresh Form{this.state.selectedTechnology}</Text>
          <Text></Text>
          ) :
          
          
            this.state.hasOnlineData == true?
            
          //  <Text>Seems like you do have already save form</Text>
            <Text></Text>
            :null
          
          
}

          <Item stackedLabel style={styles.PickerLabel}>
            <Label>{t('construction_library:technology')}</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedTechnology}
            onValueChange={e => this.handleChangeOption(e, "technology")}
          >
            <Picker.Item label={t('construction_library:technology_select')} value="0" />
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
            <Label>{t('construction_library:no_of_floor')}</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedFloor}
            onValueChange={e => this.handleChangeOption(e, "floor")}
          >
            <Picker.Item label={t('construction_library:floor_select')} value="0" />
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
            <Label>{t('construction_library:type_of_house')}</Label>
          </Item>
          <Picker
            placeholder={t('construction_library:house_select')}
            style={styles.Picker}
            selectedValue={this.state.selectedHouse}
            onValueChange={e => this.handleChangeOption(e, "house")}
          >
            <Picker.Item label={t('construction_library:house_select')} value="0" />
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
                <Label>{t('construction_library:type_of_bedroom')}</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label={t('construction_library:bedroom_select')} value="0" />
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
                <Label>{t('construction_library:type_of_bedroom')}</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label={t('construction_library:bedroom_select')} value="0" />
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
                <Label>{t('construction_library:type_of_bedroom')}</Label>
              </Item>
              <Picker
                style={styles.Picker}
                selectedValue={this.state.selectedBedroom}
                onValueChange={e => this.handleChangeOption(e, "bedroom")}
              >
                <Picker.Item label={t('construction_library:bedroom_select')} value="0" />
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
            <Label>{t('construction_library:toilet_access')}</Label>
          </Item>
          <Picker
            style={styles.Picker}
            selectedValue={this.state.selectedToilet}
            onValueChange={e => this.handleChangeOption(e, "toilet")}
          >
            <Picker.Item label={t('construction_library:toilet_access')} value="0" />
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
            <Label>{t('construction_library:terrace_location')}</Label>
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
            {t('construction_library:front_terrace')}
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
            {t('construction_library:back_terrace')}
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
            {t('construction_library:side_terrace')}
            </Text>
          </View>

          <View>
            <Item stackedLabel style={styles.PickerLabel}>
              <Label>{t('construction_library:lot_size')}</Label>
            </Item>
            <Picker
              style={styles.Picker}
              selectedValue={this.state.selectedLotSize}
              onValueChange={e => this.handleChangeOption(e, "lotsize")}
            >
              <Picker.Item label={t('construction_library:lot_size_select')} value="0" />
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
            <Label> {t('construction_library:latitude')}</Label>
            <Input value={this.state.latitude} disabled />
          </Item>
          <View style={styles.PickerLine} />

          <View style={styles.PickerLine} />

          <Item stackedLabel>
            <Label>{t('construction_library:longitude')}</Label>
            <Input value={this.state.longitude} disabled />
          </Item>
          <View style={styles.PickerLine} />
         
  
  
  


            {/**
    * <MapView coordinate={this.state.location.coords} title="My Marker" description="Some description" />

    */}
     <View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
                        
            {this.state.isConnected ? (
              <Button primary style={styles.centerButton}
              onPress={() => {
                this.formSubmit();
              }}
              
              >
                <Text> {t('construction_library:submit')} </Text>
              </Button>
            ) : (
              <Button
                primary
                style={styles.centerButton}
                onPress={() => {
                  this.submitLater();
                }}
              >
                <Text> Submit Later </Text>
              </Button>
            )}
          </View>
          <Toast
            showToast={this.state.showToast}
            buttonText="Okay"
            buttonPress={()=> this.setState({
              showToast: !this.state.showToast
            })}
            position="bottom">
            <Text>Wrong password!</Text>
          </Toast>
        </Content>
      </Container>
    );
  }
}

export default withNamespaces(['construction_library', 'common'], { wait: true })(ContactUs);
const styles = StyleSheet.create({
  icon: {
    color: "#fff",
    fontSize: 20
  },
  centerButton:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:20
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
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
 //   width,
    position: "absolute",
    top: 30
  },
  offlineText: { color: "#fff" }
});
