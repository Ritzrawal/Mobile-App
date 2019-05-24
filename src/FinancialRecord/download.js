import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Right,
    Button,
    Accordion,
    Icon,
    Title,
    Card,
    CardItem
  } from "native-base";

import Pdf from 'react-native-pdf';
import { withNamespaces } from "react-i18next";

export  class PDFExample extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    
      });
    render() {
        const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
        // const { navigation } = this.props;

      


                 

        const SystemCode = navigation.getParam('SystemCode', SystemCode);
        const fullpath = navigation.getParam('fullpath', fullpath);
       
        console.log("SystemCode2"+SystemCode);

       
        console.log("full path"+fullpath);
      //  /storage/emulated/0/Download//storage/emulated/0/Download/Construction building-2.pdf
       // const source = {uri:'file:///storage/emulated/0/Download//storage/emulated/0/Download/Construction building-2.pdf'};
        const source = {uri:'file://'+fullpath}
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,..."};

        return (
            <Container>
            <Header style={{backgroundColor:'#9ec54d'}}> 
    <Left>
    <Button transparent onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>{t('documents:back')}</Title>
    </Body>
    <Right />
  </Header>
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                        console.log(source);
                    }}
                    style={styles.pdf}/>
            </View>
            </Container>
        )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
export default withNamespaces(['documents', 'common'], { wait: true })(PDFExample);