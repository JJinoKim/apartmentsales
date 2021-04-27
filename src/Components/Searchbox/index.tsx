import React,{useState,useRef} from 'react';
import {TextInput, StyleSheet, SafeAreaView , Animated,Platform, UIManager, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
            paddingTop : 18,            
            flexDirection : "row",
            alignItems : "center",
            justifyContent : "center"
        },
        label : {
            position : 'absolute',
            left : 30,
        },
        input : {
            height : 45,
            width : 300,
            fontSize : 20,
            color : '#000000',
            borderBottomWidth : isFocused ? 3 : 2,
            borderBottomColor: isFocused ? '#1a5be7' : '#92afec',            
        },
        searchIcon : {
            marginLeft : 10,
        }

    });

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
                onChangeText={onSearchTxt}
                blurOnSubmit
            />
            <TouchableOpacity style={Styles.searchIcon}>
                <Icon name="search1" size={30} color="#000000"  />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Searchbox;