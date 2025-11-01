import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db;

// 🧠 Se estiver no navegador, cria um mock de banco em memória
if (Platform.OS === 'web') {
  console.warn('⚠️ Usando banco de dados em memória (modo web)');

  let fakeDB = [];
  let idCounter = 1;

  db = {
    async execAsync() {
      // nada pra fazer no web
    },
    async runAsync(query, params) {
      if (query.startsWith('INSERT')) {
        const [nome, data_nascimento, matricula] = params;
        fakeDB.push({ id: idCounter++, nome, data_nascimento, matricula });
      } else if (query.startsWith('DELETE')) {
        const id = params[0];
        fakeDB = fakeDB.filter(u => u.id !== id);
      } else if (query.startsWith('UPDATE')) {
        const [nome, data_nascimento, matricula, id] = params;
        const idx = fakeDB.findIndex(u => u.id === id);
        if (idx >= 0) fakeDB[idx] = { id, nome, data_nascimento, matricula };
      }
    },
    async getAllAsync() {
      return fakeDB;
    },
    async getFirstAsync(query, params) {
      const id = params[0];
      return fakeDB.find(u => u.id === id);
    },
  };
} else {
  // ✅ Ambiente nativo (Android/iOS)
  db = SQLite.openDatabase('users.db');
}

export async function createTable() {
  await db.execAsync?.(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data_nascimento TEXT NOT NULL,
      matricula TEXT NOT NULL
    );
  `);
}

export async function addUser(nome, data_nascimento, matricula) {
  await db.runAsync(
    'INSERT INTO users (nome, data_nascimento, matricula) VALUES (?, ?, ?)',
    [nome, data_nascimento, matricula]
  );
}

export async function getUsers() {
  return await db.getAllAsync('SELECT * FROM users');
}

export async function getUserById(id) {
  return await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]);
}

export async function updateUser(id, nome, data_nascimento, matricula) {
  await db.runAsync(
    'UPDATE users SET nome = ?, data_nascimento = ?, matricula = ? WHERE id = ?',
    [nome, data_nascimento, matricula, id]
  );
}

export async function deleteUser(id) {
  await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
}
