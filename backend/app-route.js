import express from 'express';
import postRouter from './router/post';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // HTML form으로 제출했을때 그떄 받은 폼을 body 안에 자동으로 파싱해줌.

const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: 'id',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};
app.use(express.static('public', options)); // 사용자가 public 폴더 안에 있는 리소스에 접근이 가능함

app.use('/posts', postRouter);

app.listen(8081);
