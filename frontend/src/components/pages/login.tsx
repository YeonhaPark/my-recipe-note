import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { apiProvider } from '../../api/providers';
import { Button } from '../atoms';
import { Input } from '../molecules';
import { AuthTemplate } from '../templates';

export default function Login() {
  const history = useHistory();
  const idEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const username = idEl.current && idEl.current.value;
      const password = passwordEl.current && passwordEl.current.value;
      if (!(username && password))
        throw new Error('fill out username or password');
      const { token } = await apiProvider.postAuth('login', {
        username,
        password,
      });
      if (token) {
        localStorage.setItem('token', token);
        alert('Welcome!');
        history.push('/main');
      } else {
        throw new Error('Please retry logging in');
      }
    } catch (err) {
      alert(err as string);
    }
  };
  return (
    <AuthTemplate headerName="Login">
      <form id="loginForm" onSubmit={handleSubmit}>
        <section>
          <Input
            data-test="username"
            myRef={idEl}
            type="text"
            labelName="ID"
            placeholder="ID"
            required
          />
          <Input
            data-test="password"
            myRef={passwordEl}
            type="password"
            labelName="Password"
            placeholder="Password"
            required
            autoComplete="off"
          />
        </section>
      </form>
      <Divider />
      <section>
        <Button
          style={{ marginBottom: '0.5rem' }}
          data-test="login-submit"
          variant="outlined"
          color="primary"
          fullWidth
          type="submit"
          form="loginForm"
        >
          Login
        </Button>
        <Link to="/signup">
          <Button
            style={{ marginBottom: '0.5rem' }}
            variant="contained"
            color="primary"
            fullWidth
            type="button"
          >
            JOIN
          </Button>
        </Link>
      </section>
    </AuthTemplate>
  );
}
