import React ,{useRef,useState} from 'react';
import {View,StyleSheet,Animated, TouchableOpacity} from 'react-native';


const Styles = StyleSheet.create({
    container : {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center',
        alignItems : 'center'
    }
})

interface Props{
    image : | 'arrow' ,
    arrowAni : React.MutableRefObject<Animated.Value>  | undefined,
    rotateState : boolean,
    rotate : Animated.AnimatedInterpolation ,
    onClick : () => void,
}

const RotateUpdown = ({image,arrowAni, rotateState, rotate, onClick} : Props) => {
      

    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={onClick}>
                <Animated.Image 
                    source={require('~/Assets/Images/Icons/icon_arrow_down.png')} style={{transform : [{rotate}]}}
                />
            </TouchableOpacity>
                            
        </View>
    );
};

export default RotateUpdown;