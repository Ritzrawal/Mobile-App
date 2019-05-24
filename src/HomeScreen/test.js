import React, { Component } from 'react'
import {
  Text,
  View,Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import Swiper from 'react-native-swiper'
import { storage } from "../../App";
// import console = require('console');

const styles = {
  slide1: {
  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB' 
  },

  slide2: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
//   uppercontainer:{
//     width:"94%",
//     height:170,
//     // borderWidth:2,
//     // borderColor:'red',
//     marginTop:10,
//     marginLeft:10,
//     //  paddingLeft:10,
     

//   },

  slide3: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default class UpperScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      dataSource:[],
      safetyData:null,
      isReady: true,
      currentLanguage: "",
      cards: []
      
    }
  }
  getData() {
    var _this = this;

    storage
      .load({
        key: "uperswiper",
        autoSync: true,
        syncInBackground: true
      })
      .then(res => {
        console.log("res data");
        console.log("Resdata" + JSON.stringify(res));
        //    if (this._isMounted) {
        //   console.log("is mounted"+ this._isMounted);

        this.setState({
          safetyData: res,
          //  acc: this.state.acc.concat( { title:  res[1].title, content: res[1].body})

          isReady: true
        });
        // }
      })
      .catch(err => {
        switch (err.name) {
          case "NotFoundError": 
            console.log("not found");
          
            break;
          case "ExpiredError":
            
            break;
        }
      });

    storage.sync = {
      // The name of the sync method must be the same as the data's key name
      // And the passed params will be an all-in-one object.
      // You can return a value or a promise here

      async uperswiper(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/gallery", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              console.log("response from sync");
              //  console.log("isready1"+this.state.isReady);
              // console.log("isready2"+_this.state.isReady);
              return response.json();
            })
            .then(responseData => {
              //    return responseData;
              if (responseData) {
                storage
                  .save({
                    key: "uperswiper",
                    //id,
                    data: responseData

                    /*    data: {
                      from: 'some other site',
                      userid: 'some userid',
                      token: 'some token'
                    },  */
                  })
                  .then(ret => {
                    console.log("thheb");
                    _this.setState(
                      {
                        safetyData: responseData
                      },
                      console.log(
                        "RESPONSE DATA FROM SYNC" +
                          JSON.stringify(_this.state.safetyData)
                      )
                    );

                    //   _this.getData();
                    // successCallback(ret);
                    // _this.getData();
                  })
                  .catch(err => {
                    console.log("catch");
                    //failCallBack(err.message);
                  });
              }
            })
            // .then(data =>
            // console.log("data"+data.documentId),
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
  componentWillMount() {
    AsyncStorage.getItem("language")
      .then(value => {
        console.log("Value" + value);
        this.setState({ currentLanguage: value });
      })
      .then(res => {
        //do something else
      });
  }
//   componentDidMount () {
//       const url="http://phlapp.drcmp.org/api/gallery"
//     fetch(url)
//     .than((response)=> response.json())
//     .than((responseJson)=>{
//         this.setState({
//             dataSource:responseJson
//         })

//     }) 
//     .catch((error)=>{
//         console.log(error)
//     })
//     this.setState({
//       items: [
//         { id: '1',
//         image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
//         css: styles.slide1 },
//         { id: '2',
//         image: {uri:'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'},

//         css: styles.slide2 },
//         { id: '3',
//         image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
//         css: styles.slide3 }
//       ]
//     })
//   }
  render () {
    if(!this.state.safetyData){
    return (
     
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
        )
    }
      return(
      <Swiper showsButtons loop={false}>
        {this.state.safetyData.map((item, key) => {
          return (
            <View key={key} style={item.css}>
            <Image style={{width:'100%',height:'100%'}} source={{uri:`http://phlapp.drcmp.org/uploads/galleries_images/${item.image}`}}/>
              {/* <Text style={styles.text}>{item.title}</Text> */}
            </View>
          )
        })}
      </Swiper>
        )
      
     
    
  }
}
