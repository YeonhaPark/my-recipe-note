import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'eyJhbGciOiJIUzI1NiJ9';
const jwtExpiresin = '2d';
const bcryptSaltRounds = 12;

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresin });
}

export async function signup(req, res) {
  const { username, password } = req.body;
  console.log('username===', username);
  if (await userRepository.findByUsername(username)) {
    // 에러 뱉기. 이미 가입한 회원임.
    return res.status(409).json({ message: `${username} already exists` });
  } else {
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);

    const userId = await userRepository.createUser({
      username,
      password: hashed,
    });

    const token = createJwtToken(userId);
    res.status(200).json({ token, username });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = userRepository.findByUsername(username);
  if (!user) {
    // 에러뱉기. 가입하지 않은 회원임.
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log('isValid?', isValidPassword);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  res.status(201).json({ token, username });
  // token이 만료된 경우 생각
}

export async function isMe(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
