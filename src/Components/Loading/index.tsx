import React from 'react';
import {ActivityIndicator , View, StyleSheet} from 'react-native';

const Style = StyleSheet.create({
    Container : {
        flex : 1,
        backgroundColor : '#FEFFFF',
        alignItems : 'center',
        justifyContent : 'center',
    }
})

const Loading = () => {
    return (
        <View style={Style.Container}>
            <ActivityIndicator color="#D3D3D3" size="large" />
        </View>
    );
};

export default Loading;