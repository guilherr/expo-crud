
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { addUser } from '../database/Database';

export default function RegisterScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [matricula, setMatricula] = useState('');

  const handleSave = async () => {
    if (!nome || !dataNascimento || !matricula) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      await addUser(nome, dataNascimento, matricula);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setNome('');
      setDataNascimento('');
      setMatricula('');
      router.push('/ListScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (dd/mm/aaaa)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <Button title="Salvar Usuário" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});
