import React,{useEffect} from 'react';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const Container = Styled.SafeAreaView`
  flex : 1;
`;

const Text = Styled.Text``;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Container>
      <Text>메메메메</Text>
    </Container>
  );
};

export default App;