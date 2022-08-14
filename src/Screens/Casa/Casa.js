import React, {useState, useEffect} from 'react';

import {
  NativeBaseProvider,
  Box,
  VStack,
  Badge,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  Pressable,
} from 'native-base';
import Database from '../../Database/Database';

const Casa = ({navigation, route}) => {
  const [fotos, setFotos] = useState([]);
  const banco = new Database();

  useEffect(() => {
    ListarFotos();
  }, []);

  const ListarFotos = () => {
    banco.ListarImagens(route.params.idCasa).then(lista => {
      setFotos(lista);
    });
  };

  return (
    <NativeBaseProvider>
      <Box py={'2'}>
        <VStack space={'3'} alignItems="center">
          <FlatList
            mx={'4'}
            data={fotos}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Image
                source={{uri: item.imagem}}
                size="2xl"
                alt="foto"
                mr={'4'}
              />
            )}
          />
          <Text
            textTransform={'uppercase'}
            fontSize="2xl"
            fontWeight={'bold'}
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {route.params.nome}
          </Text>
          <HStack space={'3'} alignItems={'center'}>
            {(() => {
              switch (route.params.tipo) {
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
            {route.params.finalidade == 0 ? (
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
          <Text
            fontSize="xl"
            color="primary.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {route.params.endereco}
          </Text>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default Casa;
