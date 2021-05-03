import React,{useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

//import DateTimePicker from '@react-native-community/datetimepicker';

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
    },
    picker : {
        height : 50,
        width : 120, 
    },
    pickerMonth : {
        height : 50,
        width : 100, 
    }
})

interface Props{
    onSelectYear :(val:string, idx:number) => void,
    onSelectMonth : (val:string, idx:number) => void,
    yearRange : number,
    isThisYear : boolean ,
}

 
const Datepicker = ({yearRange,isThisYear,onSelectYear,onSelectMonth} : Props) => {
    const [yearList, setYearList] = useState<Array<number>>([]);
    const [monthList, setMonthList] = useState<Array<string>>([]);

    const getDateList = () => {
        const year = new Date().getFullYear();        
        const arrayYear = [];
        for(let i = 0; i < yearRange; i++){
            arrayYear.push(year - i);
        }
        setYearList(arrayYear);                   
    }


    const getMonthList = () => {
        const arrayMonth = [];
        if(isThisYear){
            let month = new Date().getMonth();
            for(let i = 1; i < month+1; i++){
                if(i < 10){                    
                    arrayMonth.push("0"+i)
                }else{                    
                    arrayMonth.push(i.toString());
                }                
            }
        }else{
            for(let i = 1; i < 13; i++){
                if(i < 10){
                    arrayMonth.push("0"+i)
                }else{
                    arrayMonth.push(i.toString());
                }                
            }
        } 
        setMonthList(arrayMonth);
    }


    useEffect(() => { 
        getDateList();       
        getMonthList();
    },[isThisYear])

    return (
        <View >
            <TouchableOpacity style={Styles.container}>
                <Image source={require('~/Assets/Images/Icons/icon_calendar.png')} style={Styles.calendar} />
            <Text> 날짜 : </Text>

            <Picker style={Styles.picker} onValueChange={onSelectYear}>
                {yearList.map((e) => {
                    return <Picker.Item label={e.toString()} value={e.toString()}  style={{width : 50}}/> 
                })}
            </Picker>
            <Text>년</Text>

            <Picker style={Styles.pickerMonth} 
                onValueChange={onSelectMonth}
                >
                {monthList.map((e) => {
                    return <Picker.Item label={e} value={e} /> 
                })}
            </Picker>
            <Text>월</Text>

            </TouchableOpacity>
        </View>
    );
};



{/*


interface Props{
    date : Date,
    mode : | 'date' | 'time',
    onSelectYear :(event : Event, selectedDate : Date | undefined) => void,
    selDate : string ,
    datepickerShow : () => void,
    yearRange : number,
    isThisYear : boolean ,
}

const Datepicker = ({date, mode, onSelectDate,selDate, show,datepickerShow} : Props) => {


    return (
        <View >
            <TouchableOpacity onPress={datepickerShow} style={Styles.container}>
                <Image source={require('~/Assets/Images/Icons/icon_calendar.png')} style={Styles.calendar} />
            <Text> 날짜 : </Text>
            
            {show && 
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    onChange={onSelectDate}
            />}
                <Text style={Styles.text}>{selDate === '' ? '날짜를 선택 해 주세요' : selDate }</Text>            
            
            <Picker 
                style={Styles.picker}
            >


            </Picker>

            </TouchableOpacity>
        </View>
    );
};
  */}  
  
  
 
export default Datepicker;