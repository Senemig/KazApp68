import React, {useEffect, useState} from 'react';
import Database from '../../Database/Database';

import {
  NativeBaseProvider,
  Box,
  VStack,
  Button,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  Pressable,
  Badge,
} from 'native-base';
import {ImageEditor} from 'react-native';

const Lista = ({navigation}) => {
  const [lista, setLista] = useState([]);
  const banco = new Database();

  useEffect(() => {
    ListarCasas();
  }, []);

  const ListarCasas = () => {
    banco.ListarTodos().then(lista => {
      setLista(lista);
    });
  };
  return (
    <NativeBaseProvider>
      <Box>
        <FlatList
          data={lista}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                navigation.navigate('Detalhes', {
                  idCasa: item.imagem,
                  nome: item.nome,
                  endereco: item.endereco,
                  tipo: item.tipo,
                  finalidade: item.finalidade,
                });
              }}
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              maxh={'250'}
              pl="4"
              pr="5"
              py="2">
              <VStack space={'2'}>
                <Text
                  textTransform={'uppercase'}
                  fontSize="2xl"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {item.nome}
                </Text>
                <Text
                  fontSize="xl"
                  color="primary.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.endereco}
                </Text>
                <HStack space={'4'}>
                  {(() => {
                    switch (item.tipo) {
                      case 0:
                        return (
                          <Badge
                            px={'4'}
                            rounded={'full'}
                            colorScheme={'success'}
                            alignSelf={'center'}
                            variant={'solid'}
                            _text={{fontSize: 'xl'}}>
                            Casa
                          </Badge>
                        );
                      case 1:
                        return (
                          <Badge
                            px={'4'}
                            rounded={'full'}
                            colorScheme={'success'}
                            alignSelf={'center'}
                            variant={'solid'}
                            _text={{fontSize: 'xl'}}>
                            Apartamento
                          </Badge>
                        );
                      case 2:
                        return (
                          <Badge
                            px={'4'}
                            rounded={'full'}
                            colorScheme={'success'}
                            alignSelf={'center'}
                            variant={'solid'}
                            _text={{fontSize: 'xl'}}>
                            Comércio
                          </Badge>
                        );
                      default:
                        return (
                          <Badge
                            px={'4'}
                            rounded={'full'}
                            colorScheme={'success'}
                            alignSelf={'center'}
                            variant={'solid'}
                            _text={{fontSize: 'xl'}}>
                            Imóvel
                          </Badge>
                        );
                    }
                  })()}
                  {item.finalidade == 0 ? (
                    <Badge
                      px={'4'}
                      rounded={'full'}
                      colorScheme={'info'}
                      alignSelf={'center'}
                      variant={'solid'}
                      _text={{fontSize: 'xl'}}>
                      Venda
                    </Badge>
                  ) : (
                    <Badge
                      px={'4'}
                      rounded={'full'}
                      colorScheme={'info'}
                      alignSelf={'center'}
                      variant={'solid'}
                      _text={{fontSize: 'xl'}}>
                      Aluguel
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </Box>
    </NativeBaseProvider>
  );
};

export default Lista;
