import React,{useEffect,useState, useContext} from 'react';
import {} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import SearchBox from '~/Components/Searchbox';
import PickerComponent from '~/Components/Picker';
import Datepicker from '~/Components/Datepicker';
import ImgButton from '~/Components/ImgButton';
import CardView from '~/Components/CardView';

import {ApiContext} from '~/Context/ApiData';
import { FlatList } from 'react-native-gesture-handler';


const Container = Styled.SafeAreaView`
  background-color : #ffffff;
  flex-direction : column;
  justify-content: space-between;
  flex : 1;
`;

const SearchContainer = Styled.KeyboardAvoidingView`  
  background-color : #ffffff;
  justify-content: space-around;
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
  const {siList,selSidoList, getSido, getApiData, ApartList} = useContext<IApiData>(ApiContext);

  const [sidoCode, setSidoCode] = useState<string>('');

  // search
  const [searchText , setSearchText] = useState<string>('');
  const [focusCheck, setFocusCheck] = useState<boolean>(false);

  // Datepicker
  const [selDate , setSelDate] = useState<string>('');
  const [dateShow, setDateShow] = useState<boolean>(false);
  const [searchDate , setSearchDate] = useState<string>('');

  // Data Paging
  const [dataStart, setDataStart] = useState<number>(0);
  const [dataEnd, setDataEnd] = useState<number>(50);
  const [dataList, setDataList] = useState<Array<IApartmentData>>([]);
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
    console.log("실행실행")
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
  
  const onSelectDate = (event : Event, selectedDate : Date | undefined) => {
    setDateShow(false);
    setSelDate(moment(selectedDate).format('YYYY-MM-DD'));
    setSearchDate(moment(selectedDate).format('YYYYMM'));
  }

  // ========== datepicker start ================
  const datepickerShow = () => {
    dateShow ? setDateShow(false) : setDateShow(true);
  }


  // ========== SearchButton start ================
  const onSearch = () => {
    setDataStart(0);
    setDataEnd(50);
    getApiData(sidoCode,searchDate);
    if(ApartList) setDataList(ApartList.slice(dataStart,dataEnd));
    
  }

  const onRefresh = () => {
    console.log("리프레쉬")
  }
  

  return (
    <Container>
      <FilterContainer>
        <Datepicker 
          date={new Date()}
          mode='date'
          onSelectDate={onSelectDate}
          selDate={selDate}
          show={dateShow}
          datepickerShow={datepickerShow}
        />
        <ImgButton 
          imageName='search'
          onSearch={onSearch}
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
        <SearchBox
          label='Search Apartment'
          onSearchTxt={setSearchText}
          focusCheck = {focusCheck}
        />
      </SearchContainer>   
      
      <BodyContainer>
        {ApartList && 
        <FlatList 
          onRefresh={onRefresh}
          keyExtractor={(item, index) => {
            return `aprtment-${index}`;
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={true}
          onEndReached={()=>{
            console.log("reloading")
            setDataStart(dataStart + 50);
            setDataEnd(dataEnd + 50);
            setDataList([...dataList, ...ApartList.slice(dataStart,dataEnd)]);
          }}
          
          pagingEnabled={false}
          data={dataList}          
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