import React from 'react';
import Styled from 'styled-components/native';


const Container = Styled.SafeAreaView`
  flex : 1;
  margin-top : 10px;
  margin-left : 5px;
`;

const SearchBox = Styled.TextInput`
    padding : 10px;
    position : absolute;    
    height : 30px;
    background-color : #fff;
    border-radius : 30px;
    border : 1px solid #668aec;
    width : 282px;
`;

const index = () => {
    return (
        <Container>
            <SearchBox />
        </Container>
    );
};

export default index;