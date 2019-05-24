/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import FixedCard1 from './../components/FixedCards';

//Utils
import * as utils from '../utils';

//Constants
import {TECHNOLOGY_OPTIONS, FLOOR_OPTIONS,HOUSE_OPTIONS,BEDROOM36_OPTIONS,BEDROOM45_OPTIONS,BEDROOM54_OPTIONS,TOILET_OPTIONS,LOTSIZE_OPTIONS} from './data';

export default class EmployeeCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            _aLibraryData: []
        }
    }

    componentDidMount(){
        this._generateCardInputs();
    }

      
      
    _generateCardInputs = () => {
        let aData = 
        [
            {
                label: 'TECHNOLOGY',
                value: TECHNOLOGY_OPTIONS[this.props.data.technology]
            },
            {
                label: 'FLOOR',
                value:FLOOR_OPTIONS[this.props.data.technology]
            },
            {
                label: 'HOUSE',
                value: HOUSE_OPTIONS[this.props.data.house]
            },

            {
                label: 'TOILET',
                value:TOILET_OPTIONS[this.props.data.toiletAccess]
            },,
            {
                label: 'LOTSIZE',
                value: LOTSIZE_OPTIONS[this.props.data.lotSize]
            },,
            {
                label: 'LATITUDE',
                value: this.props.data.latitude
            },
        ]
        this.setState({ _aLibraryData: aData });
    }

    render() {
        return (
            <View style={styles.placeholder}>
                <FixedCard1
                    title={
                        this.props.data.technology + ', ' + 
                        this.props.data.floor + ' ' + 
                        this.props.data.house
                    }
                    employeeData={this.props.data}
                    onEdit={(data) => this.props.onEdit(data)}
                    attributes={this.state._aLibraryData}
                    onDelete={(data) => this.props.onDelete(data)}/>
            </View>
        );
    }
}
