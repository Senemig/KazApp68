import React, {useState, useEffect} from 'react';
import Database from '../../Database/Database';
import {
  NativeBaseProvider,
  Box,
  VStack,
  Button,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  TextArea,
  Text,
  Image,
  Radio,
  ScrollView,
  Pressable,
  AddIcon,
  FlatList,
  HStack,
} from 'native-base';
import uuid from 'react-native-uuid';
import {useIsFocused} from '@react-navigation/native';

const Cadastro = ({navigation, route}) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState(0);
  const [finalidade, setFinalidade] = useState(0);
  const [imagens, setImagens] = useState([]);
  const [id, setId] = useState(uuid.v4());

  const isFocused = useIsFocused();

  const banco = new Database();

  useEffect(() => {
    console.log('ID gerado: ' + id);
    ListarFotos(id);
  }, [isFocused]);

  const ConectarBanco = () => {
    banco.Conectar();
  };

  const Inserir = casa => {
    banco.Inserir(casa);
  };

  const ListarFotos = id => {
    banco.ListarImagens(id).then(lista => {
      setImagens(lista);
    });
  };

  const checkInput = () => {
    if (nome && endereco && imagens.length > 0) {
      const casa = {
        nome: nome,
        finalidade: finalidade,
        endereco: endereco,
        tipo: tipo,
        imagem: id,
      };
      Inserir(casa);
      navigation.goBack();
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box w="100%" maxWidth="300px" alignItems={'center'} mx="auto" my="3">
          <HStack space={'2'} maxW={'500'}>
            {imagens.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                inverted={true}
                horizontal={true}
                data={imagens}
                renderItem={({item}) => (
                  <Image
                    mr={'2'}
                    size={'20'}
                    source={{
                      uri: item.imagem,
                    }}
                    alt="Foto casa"
                  />
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <></>
            )}

            <Pressable
              onPress={() => {
                navigation.navigate('Camera', {id: id});
              }}>
              <Box
                bgColor={'light.300'}
                w="20"
                h="20"
                borderWidth="1"
                justifyContent="center"
                alignItems="center">
                <AddIcon size="10" />
              </Box>
            </Pressable>
          </HStack>
          <FormControl my={5} alignItems={'center'}>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="Finalidade do cadastro"
              value={finalidade}
              defaultValue={0}
              onChange={nextValue => {
                setFinalidade(nextValue);
              }}>
              <Stack
                justifyContent="center"
                direction={{
                  base: 'row',
                }}
                space={4}
                w="75%"
                maxW="300px">
                <Radio value={0} my={1}>
                  Venda
                </Radio>
                <Radio value={1} my={1}>
                  Aluguel
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mb={'5'} isRequired>
            <Stack mx="2">
              <FormControl.Label>Título</FormControl.Label>
              <Input
                type="text"
                placeholder="Ap 2 quartos..."
                onChangeText={text => {
                  setNome(text);
                }}
              />
              <FormControl.HelperText>
                Deve ter no mínimo 6 caractéres.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Deve ter no mínimo 6 caractéres.{' '}
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <FormControl my={5} alignItems={'center'}>
            <Radio.Group
              name="myRadioGroup2"
              accessibilityLabel="Tipo de imóvel"
              value={tipo}
              defaultValue={0}
              onChange={nextValue => {
                setTipo(nextValue);
              }}>
              <Stack
                justifyContent="center"
                direction={{
                  base: 'row',
                }}
                space={4}
                w="75%"
                maxW="300px">
                <Radio value={0} my={1}>
                  Casa
                </Radio>
                <Radio value={1} my={1}>
                  Apartamento
                </Radio>
                <Radio value={2} my={1}>
                  Comércio
                </Radio>
              </Stack>
            </Radio.Group>
          </FormControl>
          <FormControl mb={'10'} isRequired>
            <Stack mx="2">
              <FormControl.Label>Endereço</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Endereço"
                onChangeText={text => {
                  setEndereco(text);
                }}
              />
              <FormControl.HelperText>
                Deve ter no mínimo 6 caractéres.
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Deve ter no mínimo 6 caractéres.{' '}
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
          <Button
            bg={'pink.500'}
            _text={{
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            onPress={() => {
              checkInput();
            }}>
            salvar
          </Button>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Cadastro;
