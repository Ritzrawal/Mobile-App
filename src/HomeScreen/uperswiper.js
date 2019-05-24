import React, { Component } from 'react'
import {
  Text,
  View,Image
} from 'react-native'
import Swiper from 'react-native-swiper'

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

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

export default class SwiperUpperhomescreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount () {
    this.setState({
      items: [
        { id: '1',
        image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
        css: styles.slide1 },
        { id: '2',
        image: {uri:'https://i.ytimg.com/vi/sGWxZrieoXo/maxresdefault.jpg'},

        css: styles.slide2 },
        { id: '3',
        image: {uri:'https://previews.123rf.com/images/sutichak/sutichak1510/sutichak151001047/47203652-building-residential-construction-house-with-scaffold-steel-for-construction-worker-image-used-vinta.jpg'},
        css: styles.slide3 }
      ]
    })
  }
  render () {
    return (
      
      <Swiper showsButtons loop={false}>
        {this.state.items.map((item, key) => {
          return (
            <View key={key} style={item.css}>
            <Image style={{width:'100%',height:'100%'}} source={item.image}/>
              {/* <Text style={styles.text}>{item.title}</Text> */}
            </View>
          )
        })}
      </Swiper>
     
    )
  }
}