import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import api from '../servicos/api';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
  align-self: center;
`;

const Nome = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Roboto';
`;

const Login = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Roboto';
`;

const Info = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-bottom: 5px;
  font-family: 'Roboto';
`;

const RepositorioContainer = styled.View`
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 2;
`;

const NomeRepositorio = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  font-family: 'Roboto';
`;

const InfoRepositorio = styled.Text`
  font-size: 14px;
  color: #666;
  font-family: 'Roboto';
`;

type ParametrosNavegacao = {
  Principal: undefined;
  Perfil: { usuario: any };
  PesquisasRecentes: undefined;
};

type Props = NativeStackScreenProps<ParametrosNavegacao, 'Perfil'>;

const TelaPerfil: React.FC<Props> = ({ route }) => {
  const { usuario } = route.params;
  const [repositorios, setRepositorios] = useState<any[]>([]);

  useEffect(() => {
    const buscarRepositorios = async () => {
      try {
        const resposta = await api.get(`/users/${usuario.login}/repos`);
        setRepositorios(resposta.data);
      } catch (error) {
        console.error(error);
      }
    };

    buscarRepositorios();
  }, [usuario.login]);

  return (
    <Container>
      <Avatar source={{ uri: usuario.avatar_url }} />
      <Nome>{usuario.name}</Nome>
      <Login>{usuario.login}</Login>
      <Info>{usuario.location}</Info>
      <Info>ID: {usuario.id}</Info>
      <Info>Seguidores: {usuario.followers}</Info>
      <Info>Repositórios Públicos: {usuario.public_repos}</Info>
      <FlatList
        data={repositorios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
            <RepositorioContainer>
              <NomeRepositorio>{item.name}</NomeRepositorio>
              <InfoRepositorio>Linguagem: {item.language}</InfoRepositorio>
              <InfoRepositorio>Descrição: {item.description}</InfoRepositorio>
              <InfoRepositorio>Criado em: {new Date(item.created_at).toLocaleDateString()}</InfoRepositorio>
              <InfoRepositorio>Último Push: {new Date(item.pushed_at).toLocaleDateString()}</InfoRepositorio>
            </RepositorioContainer>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default TelaPerfil;
