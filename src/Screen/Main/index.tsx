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

import {ApiContext} from '~/Context/ApiData';



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
  background-color : #15ff00;
`;

const Text = Styled.Text``;
const imageSearchButton = '~/Assets/Images/Icons/icon_sch_button.png';

const App = () => {
  const {siList,selSidoList, getSido, getApiData} = useContext<IApiData>(ApiContext);

  const [sidoCode, setSidoCode] = useState<string>('');

  // search
  const [searchText , setSearchText] = useState<string>('');
  const [focusCheck, setFocusCheck] = useState<boolean>(false);
  const [searchShow, setSearchShow] = useState<boolean>(false);

  // Datepicker
  const [selDate , setSelDate] = useState<string>('');
  const [dateShow, setDateShow] = useState<boolean>(false);
  const [searchDate , setSearchDate] = useState<string>('');

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
    console.log(sidoCode);
    getApiData(sidoCode,searchDate);
    setSearchShow(true);
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
      {searchShow &&
        <SearchContainer>
          <SearchBox
            label='Search Apartment'
            onSearchTxt={setSearchText}
            focusCheck = {focusCheck}
          />
        </SearchContainer>
      }     
      
      <BodyContainer>
        <Text>여기는 결과 목록 나오는곳</Text>
      </BodyContainer>
    </Container>
  );
};

export default App;