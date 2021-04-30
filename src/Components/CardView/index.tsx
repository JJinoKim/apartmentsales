import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Styles = StyleSheet.create({
    Conatiner : {
        borderWidth : 1,
        borderColor : '#103496',
        borderRadius : 2,
        margin : 10,   
    },
    Header : {
        borderWidth : 1,
        backgroundColor : '#103496',
        color : '#ffffff',
        fontSize : 25,
        alignItems : 'center',
        textAlign : 'center',
    },
    ContentRow : {        
        flexDirection : "row",        
        justifyContent : "space-between",        
        padding : 5,
    },
    Content : {
        flexDirection : "row",
        
        justifyContent : 'space-between'
    },
    TitleText : {
        fontWeight : 'bold',
        width : 70,
        //textAlign : 'center',
    },
    ContentText : {
        width : 90,
    },
    CostText : {
        fontWeight : 'bold',
        width : 80,
        fontSize : 20,
        textAlign : 'center',
    }
})

interface Props {
    apartName : string,
    tradeMonth : number,
    tradeYear : number,
    tradeDay : number,
    buildDate : number,
    floor : number,
    area : number,
    dong : string,
    jibun : string,
    price : string,
}

const CardView = ({apartName,tradeMonth,tradeYear,tradeDay,buildDate,floor,area,dong,jibun,price } : Props) => {
    return (
        <View style={Styles.Conatiner}>
            <Text style={Styles.Header}>{apartName}</Text>
            <View style={Styles.ContentRow}>
                    <Text style={Styles.TitleText}>거래일</Text>
                    <Text style={Styles.ContentText}>{tradeYear}-{tradeMonth}-{tradeDay}</Text>
                    <Text style={Styles.TitleText}>건축년도</Text>
                    <Text style={Styles.ContentText}>{buildDate} 년</Text>
            </View>
            <View style={Styles.ContentRow}>
                <Text style={Styles.TitleText}>층</Text>
                <Text style={Styles.ContentText}>{floor} 층</Text>
                <Text style={Styles.TitleText}>전용면적</Text>
                <Text style={Styles.ContentText}>{area} ㎡</Text>
            </View>
            <View style={Styles.ContentRow}>
                <Text style={Styles.TitleText}>법정동</Text>
                <Text style={Styles.ContentText}>{dong}</Text>
                <Text style={Styles.TitleText}>지번</Text>
                <Text style={Styles.ContentText}>{jibun}</Text>
            </View>
            <View style={Styles.ContentRow}>
                <Text style={Styles.CostText}>거래가격</Text>
                <Text style={{textAlign:'center', width : 300, fontSize : 20}}>{price} (만원)</Text>
            </View>
        </View>
    );
};

export default CardView;