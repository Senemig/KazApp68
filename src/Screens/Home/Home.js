import React, {useState} from 'react';
import {NativeBaseProvider, Box, VStack, Button} from 'native-base';

const Home = ({navigation}) => {
  const [imoves, setImoveis] = useState([]);

  return (
    <NativeBaseProvider>
      <Box
        p="2"
        alignItems="center"
        _text={{
          fontSize: 60,
          fontWeight: 'medium',
          color: 'black',
          letterSpacing: 5,
        }}>
        KazApp
      </Box>
      <Box alignItems={'center'} justifyContent={'center'} height="80%">
        <VStack space={6} alignItems="center">
          <Button
            onPress={() => {
              navigation.navigate('Cadastro');
            }}
            size={'lg'}
            _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              textTransform: 'uppercase',
            }}>
            Cadastrar Imóvel
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('Lista');
            }}
            size={'lg'}
            _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              textTransform: 'uppercase',
            }}>
            Lista de Imóveis
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default Home;
