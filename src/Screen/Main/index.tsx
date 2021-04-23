import React,{useEffect} from 'react';
import {} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

import SearchBox from '~/Components/Searchbox';

const Container = Styled.SafeAreaView`
  flex : 1;
`;

const SearchContainer = Styled.View`
  flex : 1;
`;
const FilterContainer = Styled.View`
  flex : 1;
`;

const BodyContainer = Styled.View`
  flex : 10;
`;



const Text = Styled.Text``;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Container>
      <SearchContainer>
        <SearchBox />
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