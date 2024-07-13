import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CartaoUsuario from '../componentes/CartaoUsuario';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const BotaoLimpar = styled.TouchableOpacity`
  background-color: red;
  padding: 10px;
  border-radius: 25px;
  align-items: center;
  margin-bottom: 20px;
  width: 60%;
  align-self: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const TextoBotao = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto';
`;

type ParametrosNavegacao = {
  Principal: undefined;
  Perfil: { usuario: any };
  PesquisasRecentes: undefined;
};

type Props = NativeStackScreenProps<ParametrosNavegacao, 'PesquisasRecentes'>;

const TelaPesquisasRecentes: React.FC<Props> = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const usuariosArmazenados = await AsyncStorage.getItem('usuarios');
        setUsuarios(usuariosArmazenados ? JSON.parse(usuariosArmazenados) : []);
      } catch (error) {
        console.error(error);
      }
    };

    buscarUsuarios();
  }, []);

  const limparPesquisas = async () => {
    try {
      await AsyncStorage.removeItem('usuarios');
      setUsuarios([]);
      Alert.alert('Sucesso', 'Pesquisas recentes foram limpas.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <BotaoLimpar onPress={limparPesquisas}>
        <TextoBotao>Limpar Pesquisas Recentes</TextoBotao>
      </BotaoLimpar>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartaoUsuario usuario={item} onPress={() => navigation.navigate('Perfil', { usuario: item })} />
        )}
      />
    </Container>
  );
};

export default TelaPesquisasRecentes;
