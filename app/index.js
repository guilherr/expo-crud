import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { createTable } from '../database/Database';

export default function index() {
  const router = useRouter();

  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>CRUD de cliente</Text>
  <Button title="Cadastrar" onPress={() => router.push('/RegisterScreen')} />
  <Button title="Consultar" onPress={() => router.push('/ListScreen')} />
  <Button title="Atualizar" onPress={() => router.push('/EditScreen')} />
    </View>
  );
}