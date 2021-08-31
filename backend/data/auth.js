import { db } from '../db/database.js';

export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM user WHERE username=?', [username])
    .then((result) => {
      return result[0][0];
    });
}

export async function createUser(user) {
  return db
    .execute('INSERT INTO user (username, password) VALUES (?,?)', [
      user.username,
      user.password,
    ])
    .then((result) => {
      return result[0].insertId;
    });
}

export async function findById(id) {
  return db.execute('SELECT * FROM user WHERE id=?', [id]).then((result) => {
    return result[0][0];
  });
}
