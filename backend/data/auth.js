let users = [
  { id: '1', password: 'hasehdehlsdbwjspdla', username: 'bsssob@gmail.com' },
];

export async function findByUsername(username) {
  // 유저가 가입되어있는지 여부체크
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(user);

  return created.id;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
