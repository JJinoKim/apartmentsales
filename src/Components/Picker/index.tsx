import React from 'react';
import {StyleSheet, View, Image ,Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Styles = StyleSheet.create({
    constianer : {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
    },
    picker : {
        height : 50,
        width : 200
    },
    text : {
        fontSize : 20,
        marginLeft : 10,
    },
    icon : {
        marginLeft : 10,
        width : 30,
        marginRight : 20,
    },
});

interface Props {
    onChangeSi : (val:string, idx:number) => void,
    onSelectSidoCode : (val: string, idx : number) => void,
    siList : Object | undefined,
    selSidoList : Object | undefined,

}

const index = ({onChangeSi,onSelectSidoCode,siList,selSidoList} : Props) => {
    
    return (
        <View style={Styles.constianer}> 
            <Image  source={require('~/Assets/Images/Icons/icon_place.png')} style={Styles.icon} />
            <Text> 지역 : </Text>           
            <Picker 
                style={Styles.picker}
                onValueChange={onChangeSi}
            >
                {siList}
            </Picker>
            <Picker 
                style={Styles.picker}                
                onValueChange={onSelectSidoCode}
            >
                {selSidoList}
            </Picker>
        </View>
    );
};

export default index;