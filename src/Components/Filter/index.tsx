import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';



const Styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
    },
    icon : {
        marginLeft : 10,
        width : 30,
        marginRight : 20,
    },
    text : {
        fontSize : 20,
        marginLeft : 10,
    },
    picker : {
        height : 50,
        width : 150
    },
})

interface Props {
    onFilterChange : (val:string, idx:number) => void,
    onSortChange : (val:string, idx:number) => void,
}

const index = ({onFilterChange,onSortChange}: Props) => {
    return (
        <View style={Styles.container}>
            <TouchableOpacity style={Styles.container}>
                <Image  source={require('~/Assets/Images/Icons/icon_filter.png')} style={Styles.icon} />
                <Text> 정렬 : </Text>
                <Picker 
                    style={Styles.picker}
                    onValueChange={onFilterChange}>
                    <Picker.Item label='이름' value='name' />
                    <Picker.Item label='전용면적' value='area' />
                    <Picker.Item label='건축년도' value='year' />
                    <Picker.Item label='가격' value='money' />
                </Picker>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.container}>
                <Picker 
                    style={Styles.picker}
                    onValueChange={onSortChange}>
                    <Picker.Item label='오름차순' value='asc' />
                    <Picker.Item label='내림차순' value='desc' />
                </Picker>
            </TouchableOpacity>
        </View>
    );
};

export default index;