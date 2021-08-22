/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { apiProvider } from '../../api/providers';
import { Button } from '../atoms';
import { Input } from '../molecules';
import { black } from '../../theme/colors';

const ContainerStyled = withStyles({
  root: {
    padding: '0 1.5rem',
    height: '100vh',
    display: 'flex',
  },
})(Container);

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 300;
  svg {
    font-size: 3rem;
  }
  @media (min-width: 960px) {
    font-size: 4rem;
    svg {
      font-size: 4rem;
    }
  }
  color: ${black};
`;
const horizontallyCentered = css`
  display: flex;
  justify-content: center;
`;
const verticallyCentered = css`
  position: absolute;
  top: 25%;
`;

export default function Login() {
  const idEl = useRef<string>(null);
  const passwordEl = useRef<string>(null);

  const handleSubmit = async () => {
    try {
      const id = idEl.current;
      const password = passwordEl.current;
      const { token } = await apiProvider.postLogin('login', { id, password });
      localStorage.setItem('token', token);
      alert('Welcome!');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ContainerStyled>
      <div css={horizontallyCentered}>
        <div css={verticallyCentered}>
          <header css={headerStyle}>
            <div>MyRecipeNote</div>
          </header>
          <form method="post" id="loginForm" onSubmit={handleSubmit}>
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
            </section>
            <Divider />
            <section>
              {/* <Link to="/main"> */}
              <Button
                style={{ marginBottom: '0.5rem' }}
                variant="outlined"
                color="primary"
                fullWidth
                type="submit"
                form="loginForm"
              >
                Login
              </Button>
              {/* </Link> */}
              <Button
                style={{ marginBottom: '0.5rem' }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                form="loginForm"
              >
                JOIN
              </Button>
            </section>
          </form>
        </div>
      </div>
    </ContainerStyled>
  );
}
