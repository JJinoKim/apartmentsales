import React,{useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

interface Props{
    date : Date,
    mode : | 'date' | 'time',
    onSelectDate :(event : Event, selectedDate : Date | undefined) => void,
    selDate : string ,
    show : boolean,
    datepickerShow : () => void,
}


const Styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
    },
    calendar : {
        marginLeft : 10,
        width : 30,
    },
    text : {
        fontSize : 20,
        marginLeft : 10,
    }
})

const Datepicker = ({date, mode, onSelectDate,selDate, show,datepickerShow} : Props) => {
    

    return (
        <View >
            <TouchableOpacity onPress={datepickerShow} style={Styles.container}>
                <Image source={require('~/Assets/Images/Icons/icon_calendar.png')} style={Styles.calendar} />
            
            {show && 
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onSelectDate}
            />}
                <Text style={Styles.text}>{selDate === '' ? '날짜를 선택 해 주세요' : selDate }</Text>            
            </TouchableOpacity>
        </View>
    );
};

export default Datepicker;