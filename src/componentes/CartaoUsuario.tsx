import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

const Cartao = styled(TouchableOpacity)`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 2;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const NomeUsuario = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  font-family: 'Roboto';
`;

const LoginUsuario = styled.Text`
  font-size: 14px;
  color: #666;
  font-family: 'Roboto';
`;

const LocalizacaoUsuario = styled.Text`
  font-size: 12px;
  color: #999;
  font-family: 'Roboto';
`;

interface CartaoUsuarioProps {
  usuario: {
    avatar_url?: string;
    name?: string;
    login: string;
    location?: string;
  };
  onPress: () => void;
}

const CartaoUsuario: React.FC<CartaoUsuarioProps> = ({ usuario, onPress }) => {
  const avatarUrl = usuario.avatar_url || 'https://via.placeholder.com/50';

  return (
    <Cartao onPress={onPress}>
      <Avatar source={{ uri: avatarUrl }} />
      <InfoContainer>
        <NomeUsuario>{usuario.name || 'Nome não disponível'}</NomeUsuario>
        <LoginUsuario>{usuario.login}</LoginUsuario>
        <LocalizacaoUsuario>{usuario.location || 'Localização não disponível'}</LocalizacaoUsuario>
      </InfoContainer>
    </Cartao>
  );
};

export default CartaoUsuario;
