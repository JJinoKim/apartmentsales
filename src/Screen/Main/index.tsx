import React,{useEffect,useState, useContext,useRef, } from 'react';
import { View , Animated, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import SearchBox from '~/Components/Searchbox';
import PickerComponent from '~/Components/Picker';
import Datepicker from '~/Components/Datepicker';
import ImgButton from '~/Components/ImgButton';
import CardView from '~/Components/CardView';
import RotateUpdown from '~/Components/Animation/RotateUpdown';
import Filter from '~/Components/Filter';

import {ApiContext} from '~/Context/ApiData';
import { FlatList } from 'react-native-gesture-handler';
import { transform } from '@babel/core';


const Container = Styled.SafeAreaView`
  background-color : #ffffff;
  flex-direction : column;
  justify-content: space-between;
  flex : 1;
`;

const SearchContainer = Styled.KeyboardAvoidingView`  
  background-color : #ffffff;
  flex-direction : row;
  align-Items : center;
  height : 80;
  
`;

const AnimatedContainer = Styled.KeyboardAvoidingView`  
  background-color : #ffffff;
  flex-direction : row;  
  height : 0;
`;

const Styles = StyleSheet.create({
  view : {
    backgroundColor : '#ffffff',
    flexDirection : 'column',
    justifyContent : 'space-between',
    height : 0,
  }
})



const FilterContainer = Styled.KeyboardAvoidingView`
  height : 50;
  margin-top : 10;
  justify-content: space-between;
  flex-direction : row;
  align-Items : center;
  background-color : #ffffff;
`;

const BodyContainer = Styled.View`
  flex : 10;
  background-color : #ffffff;
`;

const Text = Styled.Text``;
const imageSearchButton = '~/Assets/Images/Icons/icon_sch_button.png';

const App = () => {
  const {siList,selSidoList, getSido, getApiData, ApartList, sortApartList} = useContext<IApiData>(ApiContext);
  const [DataList, setDataList] = useState<Array<IApartmentData> >([]);

  const [sidoCode, setSidoCode] = useState<string>('');

  // search
  const [searchText , setSearchText] = useState<string>('');
  const [focusCheck, setFocusCheck] = useState<boolean>(false);

  // Datepicker
  const [selYear , setSelYear] = useState<string>(new Date().getFullYear().toString());
  const [selMonth , setSelMonth] = useState<string>('01');
  const [searchDate , setSearchDate] = useState<string>('');  
  const [isThisYear, setIsThisYear] = useState<boolean>(true);

  // filter 
  const [selectedId, setSelectedId] = useState(null);
  const [filterVal, setFilterVal] = useState<string>('');
  const [asc , setAsc] = useState<number>(1);
  const [desc , setDesc] = useState<number>(-1);

  

  useEffect(() => {    
    console.log('??????')
    SplashScreen.hide();   
    if(searchText != '') {
      setFocusCheck(true);
    }else{
      setFocusCheck(false);
    }    

 
    if(ApartList)setDataList(ApartList);
  },[ApartList]);

  // ========== picker start ================
  const onChangeSi = (val: string, idx : number) => {
    getSido(val);
  }

  const picker_si = siList?.map((e,i) => {
    return <Picker.Item label={e.si_name} value={e.si_code} />
  });

  const picker_sidp = selSidoList?.map((e,i) => {    
    return <Picker.Item label={e.sido_name} value={e.sido_code} />
  });  

  const onSelectSidoCode = (val: string, idx : number) => {
    setSidoCode(val);
  }
  

  // ========== datepicker start ================
  const onSelectYear = (val:string, idx:number) => {
    setSelYear(val);
    setSearchDate(selYear+selMonth);
    if(val === new Date().getFullYear().toString()) {
      setIsThisYear(true);
    }else{
      setIsThisYear(false);
    }
  }

  const onSelectMonth = (val:string, idx:number) => {
    setSelMonth(val);
    setSearchDate(selYear+val);
  }


  // ========== SearchButton start ================

  const arrowAni = useRef(new Animated.Value(0));    
  const [rotateState,setRotateState] = useState(false);

  const rotate = arrowAni.current.interpolate({
      inputRange: [0,0.5, 1],
      outputRange: ['0deg', '-90deg','-180deg'],
  }); 

  const animateVariable = {
    rotate : arrowAni.current.interpolate({
      inputRange: [0,0.5, 1],
      outputRange: ['0deg', '-90deg','-180deg'],
    }),
    view : arrowAni.current.interpolate({
      inputRange: [0,0.5, 1],
      outputRange: [0, 70,150],
    })
  }

  const onArrowClick = () => {
    console.log(filterVal)
    Animated.timing(arrowAni.current, {
        toValue : rotateState ? 0 : 1,
        duration : 300,
        useNativeDriver : false,
    }).start(()=>{
        rotateState ? setRotateState(false) : setRotateState(true);
    });    
}

  // ??????
  const onFilterChange = async (val: string, idx : number) => {
    setFilterVal(val);
  }

  const onSortChange = async (val: string, idx : number) => {
    if(val === 'asc'){
      setAsc(1);
      setDesc(-1);
    }else if(val === 'desc'){
      setAsc(-1);
      setDesc(1);
    }
  }
  
  
  

  const onSearch = async () => {
    console.log("dd :" + sidoCode)
    await getApiData(sidoCode,searchDate);    
    flatListRef.current.scrollToIndex({index: 0, animated: true })
    //setSelectedId();
    //if(ApartList) setDataList(ApartList.slice(dataStart,dataEnd));    
  }
  
  const onRefresh = () => {
    
    console.log("????????????")    
  }
  
  const flatListRef = useRef();
  return (
    <Container>
      {/* ?????? ?????? */}
      <FilterContainer>
        <Datepicker 
          isThisYear={isThisYear}
          yearRange={20}
          onSelectYear={onSelectYear}
          onSelectMonth= {onSelectMonth}
        />        
      </FilterContainer>
      {/* ?????? ?????? */}
      <FilterContainer>
        <PickerComponent 
          onChangeSi={onChangeSi}
          onSelectSidoCode={onSelectSidoCode}
          selSidoList={picker_sidp}
          siList={picker_si}          
        />
      </FilterContainer> 
      {/* ????????? ?????? ??????????????? ??????????????? */}
      <Animated.View
          style={[Styles.view, { height: animateVariable.view }]}
      >   
          {/* ????????? ?????? */}
          <SearchBox
            label='Search Apartment'
            onSearchTxt={setSearchText}
            focusCheck = {focusCheck}
          />          
          {/* ?????? */}
          <Filter 
            onFilterChange={onFilterChange}
            onSortChange = {onSortChange}
          />       
       </Animated.View>   
      <SearchContainer>    
        <RotateUpdown         
          image='arrow'          
          arrowAni={arrowAni}
          onClick={onArrowClick}
          rotate={animateVariable.rotate}
          rotateState={rotateState}
          
        />    
        {/* ???????????? */}
        <ImgButton 
          imageName='search'
          onSearch={onSearch}          
        />                
      </SearchContainer>   
      
      <BodyContainer>
        {ApartList && 
        <FlatList           
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return `aprtment-${index}`;
          }}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
          onEndReached={()=>{
        
          }}
          extraData={ApartList[0]}
          bounces={true}
          pagingEnabled={false}          
          ref={flatListRef}
          data={ApartList && 
                ApartList                  
                  .sort((a,b) => {
                    if(filterVal === '' || filterVal === 'name') {
                      return a.????????? > b.????????? ? asc: desc;
                    }else if(filterVal === 'year'){
                      return a.???????????? > b.???????????? ? asc: desc ;
                    }else if(filterVal === 'area'){
                      return a.????????? > b.????????? ? asc: desc && a.???????????? > b.???????????? ? asc: desc;
                    }else if(filterVal === 'money'){
                      return a.????????? > b.????????? ? asc: desc && a.???????????? > b.???????????? ? asc: desc;
                    }else{
                      return -1;
                    }                               
                  })
                  .filter(r =>searchText != '' ? r.?????????.indexOf(searchText) !== -1 : r.????????? !== searchText)}          
          renderItem={({item, index}) => (            
            <CardView 
              apartName = {item.?????????}
              area = {item.????????????}
              buildDate ={item.????????????}
              dong={item.?????????}
              floor={item.???}
              jibun={item.??????}
              price={item.????????????}
              tradeDay={item.???}
              tradeMonth={item.???}
              tradeYear={item.???}
              key={index}
            />
         )}  
                  
        />
        }
        
      </BodyContainer>
    </Container>
  );
};

export default App;