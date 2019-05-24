import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  TouchableHighlight
} from "react-native";

import CardStack, { Card } from "react-native-card-stack-swiper";

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
import StrengthViewAll from './strengthviewall'
import { NavigationActions } from "react-navigation";
import { withNamespaces } from "react-i18next";
import { storage } from "../../App";
import LastSlide from './lastslide'
import ImageZoom from 'react-native-image-pan-zoom';
let arrnew=[];
// var newScore;
// import Test from "./test";


export  class StartStrengthLast extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    newScore=0;
    total_question=0;
    // this.qno = 0
    // this.score = 0
    
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const {params} = this.props.navigation.state
     const id = navigation.getParam('id');
    // const jdata = this.state.safetyData
   
    //  arrnew = Object.keys(safetyData.image).map( function(k) { return safetyData.image[k] });
    this.state = {
      safetyData: null,
      acc: [],
      isReady: true,
      currentLanguage: "",
      // question : arrnew[this.qno].question,
      // image_type : arrnew[this.qno].image_type,
      cards: [],
      cardIndex:0,
      current:1,
      score:0,
      status:true,
      TextInput_Name:0,
      countCheck : 0,
      curId:id,
     
 
   
    
    };

    // this.getData2();
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  
//   showfunctin=(id)=>{
// console.log(id);
//   }
onSwiped = () => {
  const {cards} = this.state
  const newCardNumber = cards[cards.length - 1] + 1
  this.setState({
    cards: [...this.state.cards, newCardNumber]
  })
}
_answer=(key)=>{
  //  console.log('key value is',key)
   this.setState(state=>
 {this.state.safetyData.map((touch,screen)=>{
   console.log(screen.length)
  // total_question=touch.length()
  // console.log(total_question)
  // console.log(touch)
  console.log(touch.length)
   if(key==screen){
//  var newScore=0;
    if(touch.id && touch.image_type==1){
     

     newScore = this.state.score + 1;
        // this.state.score +1
      this.setState({score: newScore});
      console.log(newScore)
        // const count = this.state.countCheck + 1
        // this.setState({ countCheck: count })
        // if(ans == this.state.correctoption ){
        //   this.score += 1
        // }
      } 
          
         else{
        // const count = this.state.countCheck - 1
        // this.setState({ countCheck: count })
        // if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score +0
        console.log('Hi buddy');
      
       
      
    }
    
  }
  else{
    return touch;
  }
    
  }
 )
}
)
}
  leftanswer=(key)=>{
  //   const item=this.state.safetyData
  //  console.log(item.total_images)
   this.setState(state=>
 {this.state.safetyData.map((touch,screen)=>{
   
   if(key==screen){
  
    if(touch.id && touch.image_type==0){
     

     newScore = this.state.score + 1;
        // this.state.score +1
      this.setState({score: newScore});
      console.log(newScore)
        // const count = this.state.countCheck + 1
        // this.setState({ countCheck: count })
        // if(ans == this.state.correctoption ){
        //   this.score += 1
        // }
      } 
          
         else{
        // const count = this.state.countCheck - 1
        // this.setState({ countCheck: count })
        // if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score +0
        console.log('Hi buddy');
      
       
      
    }
    
  }
  else{
    return touch;
  }
    
  }
 )
}
)
}

// next=()=>{
//   if(this.qno < arrnew.length-1){
//     this.qno++

//     this.setState({ countCheck: 0, question: arrnew[this.qno].question, correctoption : arrnew[this.qno].correctoption})
//   }else{
    
//     this.props.quizFinish(this.score*100/5)
//    }
// }
// handleChange(e) {
//   const {setCurrent, setScore, question} = this.props;
//   e.preventDefault();
//   const selected = e.target.value;
//   setCurrent(this.props.current + 1);
//   if (selected === question.correct) {
//     setScore(this.props.score + 1);
//   }
// }

  
  
  

  getData() {
    var _this = this;

    storage
      .load({
        key: "satrengthlast",
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

      async satrengthlast(params) {
        return (
          fetch("http://phlapp.drcmp.org/api/getstrengthenhouseimages/"+_this.state.curId, {
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
                    key: "satrengthlast",
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
  render() {
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    const that=this;
     const item=this.state.safetyData
    const id= navigation.getParam('id', id); 
    if(!this.state.safetyData){
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
    return (
      <Container>
        <Header style={{backgroundColor:'#9ec54d'}}>
          <Left>
            <Button
              transparent
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{t('swiping_last_slide:back')}</Title>
          </Body>
          <Right />
        </Header>

        {this.state.safetyData == null ? (
        
         
          <Text>{JSON.stringify(this.state.safetyData)}</Text>
         
        ) : (
          <View style={{ flex: 1 }}>
          {/* <Text>{item.length}</Text> */}
         
            <CardStack  disableBottomSwipe='true'disableTopSwipe='true'disableLeftSwipe='true'disableRightSwipe='true'
              style={styles.content}
              renderNoMoreCards={() =>
                 (
                    // this.ShowButton(),
                <View style={{alignItems:'center',justifyContent:'center',position:'absolute'}}>  
                 <Text style={{color: "gray",fontSize: 60}}>Score</Text>
                <Text
                  style={{ fontWeight: "700",alignItems:'center',marginLeft:50,marginBottom:30, fontSize: 60, color: "gray" }}

                >
                {newScore} {t('swiping_last_slide:outof')} {item.length} {t('swiping_last_slide:correct')}
                   {/* {t('material_Photo:nomorecard')} */}
                </Text>
                <Button
            style={styles.customBtnBG}
            onPress={() => this.props.navigation.navigate('StrengthTechniqueViewAll',{id:id})}
          >
          <Text>{item.id}</Text>
            <Text style={styles.customBtnText}>{t('swiping_last_slide:gotostrngth')}</Text>
          </Button>
                </View>
              )}
              
              ref={swiper => {
                this.swiper = swiper;
              }}
              cardIndex={0}
              onSwiped={(cardIndex)=>this.onSwiped(cardIndex)}
               onSwiped={(cardIndex) => console.log(cardIndex)}
              onSwipedLeft={(cardIndex)=>console.log('leftSwapped')}
            //   onSwipedLeft={() =>this.Send_Data('swiperleft')} 
            //   //  onSwipedRight={() =>this._answer()
            
            // } 
               
            >
              {this.state.safetyData.map((item, index) => {
                // console.log("accc datae" + item.id);
                // console.log(index,'index value is ')
                return (
                
                  <Card style={[styles.card, styles.card1]}
                  onSwipedLeft={(swip)=>this.leftanswer(index)}
                  
                    onSwipedRight={(swip) =>this._answer(index)
                   }
                  
                  >
                    <View>
                      
                      <Text style={styles.label}>
                        {this.state.currentLanguage == "en"
                          ? item.title
                          : item.title_phi}
                      </Text>
                      <View>
                     <ImageZoom
                     cropWidth={320}
                     cropHeight={335}
                     imageWidth={320}
                     imageHeight={335}
                     >
                      <Image style={{width:320,height:335}} source={{uri:`http://phlapp.drcmp.org/uploads/house_images/${item.image}`}}
                    
                      
                      />
                      </ImageZoom>
                    
                      <View style={{flexDirection:'row',backgroundColor:'#eeeeee'}}>
                          <TouchableOpacity
            style={styles.customBtnDNG}
            onPress={ () => { that.swiper.swipeLeft(),
                console.log('upper')
            }}
            
          >
            <Text style={styles.customBtnText}>{t('swiping_last_slide:buttonno')}
         
            </Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={styles.customBtnDNG1}
            onPress={ () => { that.swiper.swipeRight(),
            console.log('hhhhthat')
            }}
    
            
          >
       
            <Text style={styles.customBtnText}>{t('swiping_last_slide:buttonyes')}
           
            </Text>
          </TouchableOpacity>
          </View>
         
                      </View>
                      
                      
                     
                      {/* <Text style={styles.label2}>
                        {this.state.currentLanguage == "en"
                          ? item.image
                          : item.description_idn}
                      </Text> */}
                    </View>
                    {/* <View style={{backgroundColor:'#eeeeee'}}>
                    <View style={{marginTop:15,flexDirection:'row',backgroundColor:'#eeeeee'}}>
                    <TouchableHighlight
            style={styles.customBtnDNG}
            onPress={ () => { that.swiper.swipeRight(),
                console.log('upper')
            }}
            
          >
            <Text style={styles.customBtnText}>YES
         
            </Text>
          </TouchableHighlight> 
          <Button
            style={styles.customBtnDNG1}
            onPress={ () => { that.swiper.swipeRight(),
                console.log('lower')
            }}
          >
       
            <Text style={styles.customBtnText}>NO
           
            </Text>
          </Button> 
                    </View> 
                    </View>
                     */}
                     
                  </Card>  
                               
                );
              })}
            </CardStack>
        
            
                    
          
            
           
{/*                   
            <View style={{marginTop:15,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#eeeeee'}}>
                    <TouchableHighlight
            style={styles.customBtnDNG}
            // onSwipedLeft={()=>that.swiper.showfunctin()}
             onPress={ () => { that.swiper.swipeLeft() }}
          >
            <Text style={styles.customBtnText}>YES
         
            </Text>
          </TouchableHighlight> 
          <TouchableOpacity
            style={styles.customBtnDNG1}
            onPress={ () => { that.swiper.swipeRight(),
            console.log('hhhhthat')
            }}
    
            
          >
       
            <Text style={styles.customBtnText}>NO
           
            </Text>
          </TouchableOpacity> 
                    </View>  */}
            
          
                 
        
        
      
    
        
            
       
            
             
{/* <Text>Hello</Text> */}
 
  
          </View>

        )}
      </Container>
    );

  }
}
export default withNamespaces(["swiping_last_slide", "common"], { wait: true })(
    StartStrengthLast
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2"
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  customBtnDNG: {
    backgroundColor: "#BDBDB0",
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
      // marginTop:20,
    width: 150,
    height:40,
    // marginBottom:10,
  },
  customBtnDNG1: {
    backgroundColor: "#BDBDB0",
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    // marginBottom:20,
    // marginTop:20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft:20,
    width: 150,
    height:40,
    // height:50,
    // marginBottom:10,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    color: "#fff"
  },
  customBtnBG: {
    backgroundColor: "#9ec54d",
    // paddingHorizontal: 50,
    alignItems: "center",
    justifyContent:'center',
    // paddingVertical: 5,
    marginTop:10,
     marginLeft:18,
    borderRadius: 10,
    width:'90%',
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
  card: {
    width: 320,
    height: 400,
    // marginTop:40,
     backgroundColor: "#6383a8",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
     backgroundColor: "#6383a8"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  label2: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    color: "#fff"
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0
  },
  customBtnText1: {
    fontSize: 20,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",

    color: "#fff"
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderWidth: 4,
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a"
  },
  red: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d"
  }
});
