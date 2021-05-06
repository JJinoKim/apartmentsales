import React,{useState,useRef} from 'react';
import {TextInput, StyleSheet, SafeAreaView , Animated,Platform, UIManager, TouchableOpacity, Image, Text} from 'react-native';

interface Props{
    label : string,
    onSearchTxt : (txt: string) => void,
    focusCheck : boolean,
}

const Searchbox = ({label,onSearchTxt,focusCheck} : Props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const labelAni = useRef(new Animated.Value(0));    
   
    const labelStyle= {        
        top :  labelAni.current.interpolate({
            inputRange : [0, 0.5, 1],
            outputRange : [18,9,0],
        }),
        fontSize: labelAni.current.interpolate({
            inputRange : [0, 0.5, 1],
            outputRange : [20,17,14],
        }),
        color : labelAni.current.interpolate({
            inputRange : [0, 0.5, 1],
            outputRange : ['#aaa','#aaa', '#000'],
        }),
   }

    const Styles = StyleSheet.create({
        constianer : {
            //paddingTop : 18,            
            flexDirection : "row",
            alignItems : "center",
            justifyContent : "flex-start",
            marginTop : 30,
            flex : 1,
        },
        label : {
            position : 'absolute',
            left : 30,
        },
        input : {
            height : 45,
            width : 250,
            fontSize : 20,
            color : '#000000',
            borderBottomWidth : isFocused ? 3 : 2,
            borderBottomColor: isFocused ? '#1a5be7' : '#92afec',            
        },
        searchIcon : {
            marginTop : 15,
            marginLeft : 10,
        },
        icon : {
            marginLeft : 10,
            width : 30,
            marginRight : 20,
            
        },

    });
/**
    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
        
    const onFocus = () => {
        if(!focusCheck){
            isFocused ? setIsFocused(false) : setIsFocused(true);
            Animated.timing(labelAni.current, {
                toValue : isFocused ? 0 : 1,
                duration : 300,
                useNativeDriver : false,
            }).start();    
        }            
    };
 */

    const onFocus = () => {
        if(!focusCheck){
            isFocused ? setIsFocused(false) : setIsFocused(true);   
        }            
    };
    return (
        <SafeAreaView style={Styles.constianer}>   
            <Image  source={require('~/Assets/Images/Icons/icon_apart.png')} style={Styles.icon} />
            <Text> 건물명 : </Text> 
            {/**
             * 
            <Animated.Text 
                style={[
                    Styles.label,
                    labelStyle
                ]}                
            >
                {label}
            </Animated.Text>
             */}        
            

            <TextInput 
                style={Styles.input}
                onFocus={onFocus}
                onBlur={onFocus}                
                onChangeText={onSearchTxt}
                blurOnSubmit
            />
        </SafeAreaView>
    );
};

export default Searchbox;