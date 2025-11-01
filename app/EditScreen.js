
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { getUserById, updateUser } from '../database/Database';

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [matricula, setMatricula] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUserById(id);
      if (user) {
        setNome(user.nome);
        setDataNascimento(user.data_nascimento);
        setMatricula(user.matricula);
      }
    };
    loadUser();
  }, [id]);

  const handleUpdate = async () => {
    await updateUser(id, nome, dataNascimento, matricula);
    Alert.alert('Sucesso', 'Usuário atualizado!');
    router.push('/ListScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        placeholder="Data de Nascimento"
      />
      <TextInput
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
        placeholder="Matrícula"
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
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
