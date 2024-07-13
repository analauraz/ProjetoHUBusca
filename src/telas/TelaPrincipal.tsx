import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../servicos/api';
import CartaoUsuario from '../componentes/CartaoUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #D9D9D9;
  align-items: center;
`;

const EntradaTexto = styled.TextInput`
  height: 50px;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
  font-size: 13px;
  width: 80%;
  font-family: 'Roboto';
`;

const Botao = styled.TouchableOpacity`
  background-color: #ff5722;
  padding: 12px;
  border-radius: 50px;
  align-items: center;
  margin-bottom: 10px;
  width: 58%;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const TextoBotao = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto';
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BemVindoTexto = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #24292e;
  text-align: center;
  font-family: 'Roboto';
  margin-right: 10px;
`;

const SubtituloTexto = styled.Text`
  font-size: 20px;
  color: #ff5722;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Roboto';
`;

const TextoDesenvolvido = styled.Text`
  font-size: 14px;
  color: #888;
  text-align: center;
  font-family: 'Roboto';
`;

const GifIcon = styled.Image`
  width: 40px;
  height: 40px;
  resize-mode: contain;
`;

const BottomContainer = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 20px;
`;

type ParametrosNavegacao = {
  Principal: undefined;
  Perfil: { usuario: any };
  PesquisasRecentes: undefined;
};

type Props = NativeStackScreenProps<ParametrosNavegacao, 'Principal'>;

const TelaPrincipal: React.FC<Props> = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [dados, setDados] = useState<any>(null);

  const armazenarUsuario = async (usuario: any) => {
    try {
      const usuariosArmazenados = await AsyncStorage.getItem('usuarios');
      const usuarios = usuariosArmazenados ? JSON.parse(usuariosArmazenados) : [];
      usuarios.push(usuario);
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (error) {
      console.error(error);
    }
  };

  const buscarUsuario = async () => {
    if (!nomeUsuario.trim()) {
      Alert.alert('Erro', 'Por favor, digite um nome de usuário.');
      return;
    }

    try {
      const resposta = await api.get(`/users/${nomeUsuario}`);
      if (resposta.data && resposta.data.id) {
        console.log('Dados do usuário:', resposta.data);
        setDados(resposta.data);
        armazenarUsuario(resposta.data);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
        setDados(null);
      }
    } catch (error) {
      console.error('Erro na busca do usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o usuário.');
      setDados(null);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <BemVindoTexto>Bem-vindo ao HUBusca!</BemVindoTexto>
        <GifIcon source={require('../../assets/gifgit.gif')} />
      </HeaderContainer>
      <SubtituloTexto>Para começar, digite o usuário do GitHub que deseja procurar.</SubtituloTexto>
      <EntradaTexto
        placeholder="Digite o nome de usuário do GitHub"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />
      <Botao onPress={buscarUsuario}>
        <TextoBotao>Buscar</TextoBotao>
      </Botao>
      {dados && (
        <CartaoUsuario
          usuario={dados}
          onPress={() => navigation.navigate('Perfil', { usuario: dados })}
        />
      )}
      <BottomContainer>
        <Botao onPress={() => navigation.navigate('PesquisasRecentes')}>
          <TextoBotao>Pesquisas Recentes</TextoBotao>
        </Botao>
        <TextoDesenvolvido>Desenvolvido por Ana Laura França</TextoDesenvolvido>
      </BottomContainer>
    </Container>
  );
};

export default TelaPrincipal;
