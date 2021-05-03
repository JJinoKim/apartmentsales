import React,{useEffect,useState, useContext,useRef} from 'react';
import { View , Animated} from 'react-native';
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

import {ApiContext} from '~/Context/ApiData';
import { FlatList } from 'react-native-gesture-handler';


const Container = Styled.SafeAreaView`
  background-color : #ffffff;
  flex-direction : column;
  justify-content: space-between;
  flex : 1;
`;

const SearchContainer = Styled.KeyboardAvoidingView`  
  flex : 1;
  background-color : #ffffff;
  flex-direction : row;
  align-Items : center;
  height : 80;
`;
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
  const {siList,selSidoList, getSido, getApiData, ApartList, DataList,reloadData} = useContext<IApiData>(ApiContext);

  const [sidoCode, setSidoCode] = useState<string>('');

  // search
  const [searchText , setSearchText] = useState<string>('');
  const [focusCheck, setFocusCheck] = useState<boolean>(false);

  // Datepicker
  const [selYear , setSelYear] = useState<string>(new Date().getFullYear().toString());
  const [selMonth , setSelMonth] = useState<string>('01');
  const [searchDate , setSearchDate] = useState<string>('');  
  const [isThisYear, setIsThisYear] = useState<boolean>(true);

  // Data Paging
  const [dataStart, setDataStart] = useState<number>(0);
  const [dataEnd, setDataEnd] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {    
        
    SplashScreen.hide();   
    if(searchText != '') {
      setFocusCheck(true);
    }else{
      setFocusCheck(false);
    }    

    selSidoList?.map((e,i)=>{
      if(i === 0){
        setSidoCode(e.sido_code);
      }
    });   
  
  },[]);

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
    setSearchDate(selYear+selMonth);
  }


  // ========== SearchButton start ================

  const arrowAni = useRef(new Animated.Value(0));    
  const [rotateState,setRotateState] = useState(false);

  const rotate = arrowAni.current.interpolate({
      inputRange: [0,0.5, 1],
      outputRange: ['0deg', '-90deg','-180deg'],
  }); 

  const onArrowClick = () => {
    Animated.timing(arrowAni.current, {
        toValue : rotateState ? 0 : 1,
        duration : 300,
        useNativeDriver : false,
    }).start(()=>{
        rotateState ? setRotateState(false) : setRotateState(true);
    });    
}


  const onSearch = () => {
    setDataStart(0);
    setDataEnd(50);
    getApiData(sidoCode,searchDate);
    //if(ApartList) setDataList(ApartList.slice(dataStart,dataEnd));    
  }

  const onRefresh = () => {
    console.log("리프레쉬")    
  }
  

  return (
    <Container>
      <FilterContainer>
        <Datepicker 
          isThisYear={isThisYear}
          yearRange={10}
          onSelectYear={onSelectYear}
          onSelectMonth= {onSelectMonth}
        />
        
      </FilterContainer>
      <FilterContainer>
        <PickerComponent 
          onChangeSi={onChangeSi}
          onSelectSidoCode={onSelectSidoCode}
          selSidoList={picker_sidp}
          siList={picker_si}          
        />
      </FilterContainer> 
      <SearchContainer>    
        <RotateUpdown         
          image='arrow'          
          arrowAni={arrowAni}
          onClick={onArrowClick}
          rotate={rotate}
          rotateState={rotateState}
          
        />    
        <ImgButton 
          imageName='search'
          onSearch={onSearch}          
        />        
        {false && <View>
          <SearchBox
            label='Search Apartment'
            onSearchTxt={setSearchText}
            focusCheck = {focusCheck}
          />
        </View>}
        
      </SearchContainer>   
      
      <BodyContainer>
        {ApartList && 
        <FlatList 
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return `aprtment-${index}`;
          }}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={true}
          onEndReached={()=>{
            console.log("reloading")
            setDataStart(dataStart + 50);
            setDataEnd(dataEnd + 50);
            reloadData(dataStart, dataEnd);
          }}
          bounces={true}
          pagingEnabled={false}
          data={DataList}          
          renderItem={({item, index}) => (            
            <CardView 
              apartName = {item.아파트}
              area = {item.전용면적}
              buildDate ={item.건축년도}
              dong={item.법정동}
              floor={item.층}
              jibun={item.지번}
              price={item.거래금액}
              tradeDay={item.일}
              tradeMonth={item.월}
              tradeYear={item.년}
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