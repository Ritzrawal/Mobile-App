import React, { PureComponent } from 'react';
import { View, NetInfo, Dimensions, StyleSheet,Image } from 'react-native';
import {
Text,
Button,Content
} from "native-base";

const { width } = Dimensions.get('window');


function Message() {
console.log(JSON.stringify(this.props));

}

class NoData extends PureComponent {
constructor(props) {
super(props);
state = {

};
}



render() {
const {navigate} = this.props.navigation;

return (
<Content padder>
<View>
<View style={{alignItems: 'center', justifyContent: 'center'}}>
<Image source={require('../../assets/icons/document.png')} style={{width: 100, height: 100, marginTop: 50}} />
</View>

<View style={{paddingHorizontal:20}}>
<Text>Seems like data is not available at this moment..Please try next time</Text>
<Button block info onPress={() => {
this.props.navigation.navigate('Home');
}} >


<Text>Go to HomePage</Text>
</Button>
</View>


</View>

</Content>
);


return null;
}
}

const styles = StyleSheet.create({

});

export default NoData;