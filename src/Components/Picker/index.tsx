import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Styles = StyleSheet.create({
    constianer : {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center"
    },
    picker : {
        height : 50,
        width : 200
    }
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