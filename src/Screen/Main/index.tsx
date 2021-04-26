import React,{useEffect} from 'react';
import {} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

import SearchBox from '~/Components/Searchbox';

const Container = Styled.SafeAreaView`
  background-color : #ffffff;
  flex-direction : column;
  justify-content: space-between;
  flex : 1;
`;

const SearchContainer = Styled.KeyboardAvoidingView`  
  background-color : #ff010111;
  justify-content: space-around;
  height : 80;
`;
const FilterContainer = Styled.KeyboardAvoidingView`
  height : 50;
  justify-content: space-around;
  background-color : #0026ff;
`;

const BodyContainer = Styled.View`
  flex : 10;
  background-color : #15ff00;
`;




const Text = Styled.Text``;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Container>
      <SearchContainer>
        <SearchBox
          label='라벨'
        />
      </SearchContainer>
      <FilterContainer>
        <Text>여기는 필터 </Text>
      </FilterContainer>
      <BodyContainer>
        <Text>여기는 결과 목록 나오는곳</Text>
      </BodyContainer>
    </Container>
  );
};

export default App;