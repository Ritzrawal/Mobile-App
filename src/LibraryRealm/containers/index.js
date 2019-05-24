/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Realm from'realm';
import styles from './styles';
import EmployeeSchema from './data';
import EmployeeForm from './employeeForm';
import ActionButton from '../components/ActionButton';
import EmployeeCard from './employeeCard';

//Utils
import * as utils from '../utils';

//Constants
const ERROR_SAVE = 'An error was encountered while saving employee data. Please try again.';
const ERROR_UPDATE = 'An error was encountered while saving employee data. Please try again.';
const ERROR_DELETE = 'An error was encountered while deleting an employee. Please try again.';
const SUCCESS_ADD = 'New Library has been successfully added.'
const SUCCESS_UPDATE = 'Successfully updated existing data.'
const SUCCESS_DELETE = 'Successfully deleted ';
const WARNING_DELETE = 'This action is irreversible. Are you sure you want to delete '

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      realm: null,
      _aLibraryList: [
         {
          key: '0', //primary key
          technology:  'technology',
          floor: 'floor',
          house: 'house',
          bedroom: 'bedroom',
          toiletAccess: 'toiletAccess',
          terraceFront: 'terraceFront',
          terraceBack: 'terraceBack',
          terraceSize: 'terraceSize',
          lotSize: 'lotSize',
          latitude: 'latitude',
          longitude: 'longitude'
        } 
      ],
      _oActiveLibrary: null,
      _bShowForm: false,
      _oDefaultLibraryInfo: {
        key: '', //primary key
        technology:  '',
        floor: '',
        house: '',
        bedroom: '',
        toiletAccess: '',
        terraceFront: '',
        terraceBack: '',
        terraceSize: '',
        lotSize: '',
        latitude: '',
        longitude: ''
      },
      _refreshing: false
    };
  }

  componentDidMount() {
    this._initData();
  }
  
  _initData = async() => {
    await Realm.open({schema: [ConstructionLibrarySchema], schemaVersion: 4})
    .then(realm => {
      this.setState({ realm})
    })
    .catch(error => {
      console.log(error);
    });

    this._getData()
  }

  _refreshList = () => {
    this._getData();
  }

  _addNewEmployee = () => {
    this.setState({ 
      _bShowForm: true,
      _oActiveLibrary: JSON.parse(JSON.stringify(this.state._oDefaultLibraryInfo))
    })
  }

  _onEdit = (oActiveData) => {
    console.log("ON EDIT");
    console.log("ON EDIT"+JSON.stringify(oActiveData));
    this.setState({ 
      _bShowForm: true,
      _oActiveLibrary: {...oActiveData}
    })
  }

  _getData = () => {
    const oLibraryList = this.state.realm.objects('ConstructionLibrary').sorted('key');

    console.log("EMPLOYEE LIST"+JSON.stringify(oLibraryList));
    this.setState({ _aLibraryList: [...oLibraryList] })
  }

  _onCancel = () => {
    this._hideForm()
  }

  _onSave = async(value) => {
    let bIsSaved = await this._writeToStore(value);
    if(bIsSaved){
      Alert.alert(
        'Success',
        this.state._oActiveLibrary.key === '' ? SUCCESS_ADD : SUCCESS_UPDATE,
        [{text: 'OK', onPress: this._hideForm}],
        { cancelable: false }
      )
    }
    else{
      Alert.alert(
        'Error',
        value.key === '' ? ERROR_SAVE : ERROR_UPDATE,
        [{text: 'OK', onPress: ()=>{}}],
        { cancelable: false }
      )
    }
  }

  _onDelete = (oData) => {
    const oName =  oData.firstname + ' ' + oData.middlename + ' ' + oData.lastname
    Alert.alert(
      'Warning',
      WARNING_DELETE + oName + ' ?',
      [
          {text: 'NO', onPress: () => {}},
          {text: 'YES', onPress: () => {this._deleteData(oData, oName)} },
      ],
          { cancelable: false }
    )
  }

  _deleteData = async(oData, oName) => {
    let bFlag = await this._writeToStore(oData, true);
    console.log("BFLAG"+bFlag);
    if(bFlag){
      Alert.alert(
        'Success',
        SUCCESS_DELETE + oName,
        [{text: 'OK', onPress: this._hideForm}],
        { cancelable: false }
      )
    }
    else{
      Alert.alert(
        'Error',
        ERROR_DELETE,
        [{text: 'OK', onPress: ()=>{}}],
        { cancelable: false }
      )
    }
  }

  _hideForm = () => {
    this.setState({ 
      _bShowForm: false,
      _oActiveLibrary: null
    })
  }

  //Realm CRUD
  _writeToStore = async (oData, bDelelete = false) => {
    try{
      let bUpdateFlag = false;
      const realm = this.state.realm;
      var iKey = '';
      //Delete Key
      if(bDelelete){
      
        console.log("INTO THE BDELETE");
      console.log("oDtat"+oData.key);
        this.iKey=oData.key;
        console.log("oDtat2"+  this.iKey);
        bUpdateFlag = true;
        console.log(JSON.stringify(oData));
        console.log("BDELETE KEYGGG"+this.ikey);
      }
      //Add Key
      else if(this.state._oActiveLibrary.key === ''){
        this.iKey = String(this.state._aLibraryList.length);
        console.log("NOW IKEY IS"+this.iKey);
      }
      //Modify Key
      else{
        console.log("WRITE TO STORE ELSE"+this.state._oActiveLibrary.key);
        this.iKey = String(this.state._oActiveLibrary.key);
          bUpdateFlag = true;
      }
      
      await realm.write(() => {
        console.log("REALM WRITE");
        console.log("IKEY ="+ this.iKey  );



        console.log("technology"+ oData.technology  );
        console.log("floor"+ oData.floor  );
        console.log("house"+ oData.house  );
        console.log("bedroom"+ oData.bedroom  );
        console.log("toiletAccess"+ oData.toiletAccess  );
        console.log("terraceFront"+ oData.terraceFront  );
        console.log("terraceBack"+ oData.terraceBack  );
        console.log("terraceSize"+ oData.terraceSize  );
        console.log("lotSize"+ oData.lotSize  );

        console.log("latitude"+ oData.latitude  );
        console.log("longitude"+ oData.longitude  );
      /*
      
        let oLibrary = realm.create('Library', {
         key: iKey,
          firstname:  oData.firstname || '',
          middlename: oData.middlename || '',
          lastname: oData.lastname || '',
          nickname: oData.nickname || '',
          birthday: utils.convertDateToString(oData.birthday)  || '',
          gender: oData.gender || '',
          address: oData.address || '',
          position: oData.position || '',
          salary: oData.salary || '',
        }, bUpdateFlag);
*/

      });
      this._getData();
      return true;
    }
    
    catch(exception){
      console.log('exception1111: ' + exception.message)
      return false;
    }
  }

  render() {
    const iListLen = this.state._aLibraryList.length;

    if(this.state._bShowForm){
      return(
        <EmployeeForm
          title={this.state._oActiveLibrary.key === '' ? 'ADD NEW EMPLOYEE' : 'MODIFY EMPLOYEE PROFILE' }
          visible={this.state._bShowForm}
          onCancel={this._onCancel}
          onSave={this._onSave}
          activeData={this.state._oActiveLibrary}
        />
      )
    }
    else{
      const oListHeader = (
        <View style={styles.header.container}>
          <Text style={styles.header.txtTitle}>
            MY EMPLOYEES
          </Text>
        </View>
      )

      const oList = (
        <FlatList
            getItemLayout={this._getItemLayout}
            initialNumToRender={2}
            refreshing={this.state._refreshing}
            onRefresh={() => {this._refreshList()}}
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state._aLibraryList}
            renderItem={({item}) =>
              <EmployeeCard
                data={item}
                onEdit={this._onEdit}
                onDelete={this._onDelete}
              />
            }
        />
      )
      return (
        <View style={styles.container}>
          {
            iListLen > 0 ?
              <View style={{flex:1}}>
                {oListHeader}
                <View style={styles.body}>
                  {oList}
                </View>
              </View>
            :
            <TouchableOpacity
              style={styles.contEmpty}
              onPress={this._addNewEmployee}>
              <Text style={styles.txtDefault}>
                No Existing Library. Tap anywhere to Add.
              </Text>
            </TouchableOpacity>
          }
          <ActionButton onPress={this._addNewEmployee}/>
        </View>
      );
    }
  }
}
