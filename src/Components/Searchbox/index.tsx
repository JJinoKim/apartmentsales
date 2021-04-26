import React,{useState, useEffect,useRef} from 'react';
import Styled from 'styled-components/native';
import {View,StatusBar,TextInput,Text, StyleSheet, SafeAreaView , Animated,Platform, UIManager} from 'react-native';


interface Props{
    label : string,
}

const index = ({label} : Props) => {
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
            paddingTop : 18
        },
        label : {
            position : 'absolute',
            left : 0 ,        
        },
        input : {
            height : 45,
            fontSize : 20,
            color : '#000',
            borderBottomWidth : 1,
            borderBottomColor: '#555',            
        }
    });

    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
        


    const onFocus = () => {
        isFocused ? setIsFocused(false) : setIsFocused(true);
        Animated.timing(labelAni.current, {
            toValue : isFocused ? 0 : 1,
            duration : 300,
            useNativeDriver : false,
        }).start(()=>{
        });        
    };
    
    const onBlur = () => {
        
    }


    useEffect(() => {
      
    })


    return (
        <SafeAreaView style={Styles.constianer}>            
            <Animated.Text 
                style={[
                    Styles.label,
                    labelStyle
                ]}                
            >
                {label}
            </Animated.Text>
            <TextInput 
                style={Styles.input}
                onFocus={onFocus}
                onBlur={onFocus}
                blurOnSubmit
            />
        </SafeAreaView>
    );
};

export default index;