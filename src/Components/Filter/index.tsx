import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';




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
})

const index = () => {
    return (
        <View style={Styles.container}>
            <TouchableOpacity style={Styles.container}>
                <Image  source={require('~/Assets/Images/Icons/icon_filter.png')} style={Styles.icon} />
                <Text> 정렬 : </Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;