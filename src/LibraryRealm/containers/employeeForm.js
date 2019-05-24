
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native';
import t from 'tcomb-form-native'; 

//Styles
import styles from './styles';

//Custom Component
import FormContainer from '../components/FormContainer';

//Custom tcomb
import {CustomSelectPickerTemplate} from '../customTcomb/selectPickerTemplate';
import {CustomDatePickerTemplate} from '../customTcomb/datePickerTemplate';

//Utils
import * as utils from '../utils';
import stylesheet from '../customTcomb/styles';



  
  
//Constants
import {TECHNOLOGY_OPTIONS, FLOOR_OPTIONS,HOUSE_OPTIONS,BEDROOM36_OPTIONS,BEDROOM45_OPTIONS,BEDROOM54_OPTIONS,TOILET_OPTIONS,LOTSIZE_OPTIONS} from './data';
const ERROR_MESSAGE = '*Required field';
const Form = t.form.Form;

export default class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _oLibrary: {
                technology: this.props.activeData.technology || '',
                floor: this.props.activeData.floor || '',
                house: this.props.activeData.house || '',
                bedroom: this.props.activeData.bedroom || '',
                toiletAccess: this.props.activeData.toiletAccess || '',
                terraceFront: this.props.activeData.terraceFront || '',
                terraceBack: this.props.activeData.terraceBack || '',
                terraceSize: this.props.activeData.terraceSize || '',
                lotSize: this.props.activeData.lotSize || '',
                latitude: this.props.activeData.latitude || '',
                longitude: this.props.activeData.longitude || '',
            },

            _oOriginalData: null
        };
    }

    componentDidMount(){
        this.setState({ _oOriginalData: {...this.state._oLibrary} });
    }

    _onChange = (value) => {
        let oLibrary = {...this.state._oLibrary};
        oLibrary.technology = value.technology || '';
        oLibrary.floor = value.floor  || '';
        oLibrary.house = value.house  || '';
        oLibrary.bedroom = value.bedroom  || '';
        oLibrary.toiletAccess = value.toiletAccess  || null;
        oLibrary.lotSize = value.lotSize  || '';
        oLibrary.latitude = value.latitude  || '';
        oLibrary.longitude = value.longitude  || '';
        oLibrary.salary = value.salary  || '';
        this.setState({ _oLibrary: oLibrary })
    }

    _onSubmit = () => {
        Keyboard.dismiss();
    let oLibrary = this.refs.form_library.getValue();
console.log(JSON.stringify(oLibrary));
       if (oLibrary) {
            this.props.onSave(oLibrary);
        }
    }

    _onCancel = () => {
        Keyboard.dismiss();
        if( JSON.stringify(this.state._oLibrary) === JSON.stringify(this.state._oOriginalData) ){
            this.props.onCancel()
        }
        else{
            Alert.alert(
                'Warning',
                'Unsaved data will be lost. Are you sure you want to exit ?',
                [
                    {text: 'NO', onPress: () => {}},
                    {text: 'YES', onPress: () => this.props.onCancel()},
                ],
                    { cancelable: false }
            )
        }
    }
    
    
    render(){

        console.log('TECHNOLOGY_OPTIONS: ' + JSON.stringify(TECHNOLOGY_OPTIONS));
        console.log('FLOOR_OPTIONS: ' + JSON.stringify(FLOOR_OPTIONS));
        console.log('HOUSE_OPTIONS: ' + JSON.stringify(HOUSE_OPTIONS));
        console.log('BEDROOM36_OPTIONS: ' + JSON.stringify(BEDROOM36_OPTIONS));
        console.log('BEDROOM45_OPTIONS: ' + JSON.stringify(BEDROOM45_OPTIONS));
        console.log('BEDROOM54_OPTIONS: ' + JSON.stringify(BEDROOM54_OPTIONS));
        console.log('TOILET_OPTIONS: ' + JSON.stringify(TOILET_OPTIONS));
     
        console.log('LOTSIZE_OPTIONS: ' + JSON.stringify(LOTSIZE_OPTIONS));
 
        console.log('JSON.stringify(this.state._oLibrary): ' + JSON.stringify(this.state._oLibrary));
        console.log('JSON.stringify(this.state._oOriginalData): ' + JSON.stringify(this.state._oOriginalData));
      //  const GENDER = t.enums(GENDER_OPTIONS)
        const TECHNOLOGY = t.enums(TECHNOLOGY_OPTIONS)
        const FLOOR = t.enums(FLOOR_OPTIONS)
        const HOUSE = t.enums(HOUSE_OPTIONS)
        const BEDROOM36 = t.enums(BEDROOM36_OPTIONS)
        const BEDROOM45 = t.enums(BEDROOM45_OPTIONS)
        const BEDROOM54 = t.enums(BEDROOM54_OPTIONS)
        const TOILET = t.enums(TOILET_OPTIONS)
        const LOTSIZE = t.enums(LOTSIZE_OPTIONS)

        const OPTIONS = {
            fields: {
                technology:{ 

                    template: CustomSelectPickerTemplate,
                    prompt: 'Select Technology',
                    label: 'TECHNOLOGY',
                 //   returnKeyType: 'next',
                   // autoCorrect: false,
                   // onSubmitEditing: (event) => {this.refs.form_library.getComponent('floor').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
               floor:{ 
                    template: CustomSelectPickerTemplate,
                    prompt: 'Select Floor',
                    label: 'FLOOR',
                 //   returnKeyType: 'next',
                   // autoCorrect: false,
                   // onSubmitEditing: (event) => {this.refs.form_library.getComponent('floor').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
      house:{ 
                    template: CustomSelectPickerTemplate,
                    prompt: 'Select House',
                    label: 'HOUSE',
                 //   returnKeyType: 'next',
                   // autoCorrect: false,
                   // onSubmitEditing: (event) => {this.refs.form_library.getComponent('floor').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
     bedroom:{ 
        label: 'Bedroom' ,
        returnKeyType: 'done',
        error: ERROR_MESSAGE
                },
                     toiletAccess:{ 
                    template: CustomSelectPickerTemplate,
                    prompt: 'Select Toilet Access',
                    label: 'TOILET ACCESS',
                 //   returnKeyType: 'next',
                   // autoCorrect: false,
                   // onSubmitEditing: (event) => {this.refs.form_library.getComponent('floor').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                lotSize:{ 
                    template: CustomSelectPickerTemplate,
                    prompt: 'Select Lot Size',
                    label: 'LOTSIZE',
                 //   returnKeyType: 'next',
                   // autoCorrect: false,
                   // onSubmitEditing: (event) => {this.refs.form_library.getComponent('floor').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                latitude:{ 
                    label: 'Latitude' ,
                    returnKeyType: 'done',
                    error: ERROR_MESSAGE
                },
                longitude:{ 
                    label: 'Longitude' ,
                    returnKeyType: 'done',
                    error: ERROR_MESSAGE
                }
            },
            stylesheet: stylesheet
        }
        const LIBRARY = t.struct({
            technology: TECHNOLOGY,
            floor: FLOOR,
            house: HOUSE,
            bedroom: t.String,
            toiletAccess: TOILET,
            lotSize: LOTSIZE,
            latitude: t.String,
            longitude: t.String
        })

        console.log('rendering form')
        return(
            <FormContainer
                onSubmit = {this._onSubmit}
                onCancel = {this._onCancel}
                padding = {35}
                title={this.props.title}>

                <Form 
                    ref='form_library'
                    type={LIBRARY} 
                    onChange={this._onChange}
                    value={this.state._oLibrary}
                    options={OPTIONS}/>
                
            </FormContainer>
        )
    }
}
