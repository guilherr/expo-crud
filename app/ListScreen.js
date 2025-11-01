import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { deleteUser, getUsers } from '../database/Database';


export default function ListScreen() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>👤 {item.nome}</Text>
            <Text style={styles.text}>🎂 {item.data_nascimento}</Text>
            <Text style={styles.text}>🆔 {item.matricula}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => router.push({ pathname: '/EditScreen', params: { id: item.id } })} />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
