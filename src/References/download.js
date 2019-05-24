import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Platform } from 'react-native'
import { Button, Footer, FooterTab, Text } from "native-base"


import Pdf from 'react-native-pdf'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
export default class ReadMagazine extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            //magazine: this.props.navigation.state.params.magazine
        })
    }

    download() {
        let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
        .config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
         // path : dirs.DocumentDir + '/fromapp',
          fileCache : true,
          path : dirs.DocumentDir + '/BCDownload'
        //path : dirs.DCIMDir + '/BCDownload'
         
        })
        .fetch('GET', 'http://www.pdf995.com/samples/pdf.pdf', {
          //some headers ..
        })
        .then((res) => {
          // the temp file path
          console.log('The file saved to ', res.path())

          // get a list of files and directories in the main bundle
RNFS.readDir(dirs.DocumentDir + '/BCDownload' ) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
.then((result) => {
  console.log('GOT RESULT', result);

  // stat the first file
  return Promise.all([RNFS.stat(result[0].path), result[0].path]);
})
.then((statResult) => {
  if (statResult[0].isFile()) {
    // if we have a file, read it
    return RNFS.readFile(statResult[1], 'utf8');
  }

  return 'no file';
})
.then((contents) => {
  // log the file contents
  console.log(contents);
})
.catch((err) => {
  console.log(err.message, err.code);
});
        })













     /*   let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
            .config({
                // fileCache: true,
                // by adding this option, the temp files will have a file extension
                // appendExt: 'pdf',
                path: dirs.DocumentDir,
                addAndroidDownloads: {
                    useDownloadManager: true, // <-- this is the only thing required
                    // Optional, override notification setting (default to true)
                    notification: false,
                    // Optional, but recommended since android DownloadManager will fail when
                    // the url does not contains a file extension, by default the mime type will be text/plain
                    mime: 'application/pdf',
                    description: 'pdf are being downloaded.'
                }
            })
            .fetch('GET', 'http://www.pdf995.com/samples/pdf.pdf', {
                //some headers ..
            })
            .then((res) => {
                // the temp file path with file extension `pdf`
                alert('pdf successfully downloaded')
            })

*/


















        
    }

    render() {
        const source = { uri:'http://www.pdf995.com/samples/pdf.pdf', cache: true }
        return (
            <View style={magzStyle.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`)
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`)
                    }}
                    onError={(error) => {
                        console.log(error)
                    }}
                    style={magzStyle.pdf} />
                <Footer>
                    <FooterTab>
                        <Button style={{ backgroundColor: '#f38d1f' }}
                            onPress={() => this.download()}>
                            <Text style={{ color: '#fff' }}>Download</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        )
    }
}

const magzStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
})