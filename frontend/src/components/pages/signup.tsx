import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { apiProvider } from '../../api/providers';
import { Button } from '../atoms';
import { Input } from '../molecules';
import { AuthTemplate } from '../templates';

export default function Signup() {
  const history = useHistory();

  const idEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const repasswordEl = useRef<HTMLInputElement>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const username = idEl.current && idEl.current.value;
      const password = passwordEl.current && passwordEl.current.value;
      const repassword = repasswordEl.current && repasswordEl.current.value;
      if (password !== repassword) {
        return alert("Passwords don't match");
      }
      const { token } = await apiProvider.postAuth('signup', {
        username,
        password,
      });
      localStorage.setItem('token', token);
      alert('Welcome!');
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthTemplate headerName="Sign Up">
      <form id="signupForm" onSubmit={handleSignup}>
        <section>
          <Input
            myRef={idEl}
            type="text"
            labelName="ID"
            placeholder="ID"
            required
          />
          <Input
            myRef={passwordEl}
            type="password"
            labelName="Password"
            placeholder="Password"
            required
          />
          <Input
            myRef={repasswordEl}
            type="password"
            labelName="Retype Password"
            placeholder="Retype Password"
            required
          />
        </section>
      </form>
      <Divider />
      <section>
        <Button
          style={{ marginBottom: '0.5rem' }}
          variant="outlined"
          color="primary"
          fullWidth
          type="submit"
          form="signupForm"
        >
          Signup
        </Button>
        <Link to="/login">
          <Button
            style={{ marginBottom: '0.5rem' }}
            variant="contained"
            color="primary"
            fullWidth
            type="button"
          >
            Back to Login
          </Button>
        </Link>
      </section>
    </AuthTemplate>
  );
}
