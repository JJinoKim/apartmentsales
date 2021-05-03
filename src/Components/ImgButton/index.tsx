import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

const Styles = StyleSheet.create({
    container : {
        right : 1,
        justifyContent : 'flex-end',        
    },
    image : {
        width : 40,
        marginRight : 10
    }
})

interface Props {
    imageName : |'search' ,
    onSearch : () => void,
}

const ImgButton = ({imageName,onSearch} : Props) => {

    const imageSource = {
        search : require('~/Assets/Images/Icons/icon_sch_button.png'),
    }

    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={onSearch}>
                <Image style={Styles.image}
                    source={imageSource[imageName]}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ImgButton;