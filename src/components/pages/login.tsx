/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Container, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Button } from '../atoms';
import Input from '../molecules';
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
  font-weight: 100;
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
  return (
    <ContainerStyled>
      <div css={horizontallyCentered}>
        <div css={verticallyCentered}>
          <header css={headerStyle}>
            <div>MyRecipeNote</div>
          </header>
          <section>
            <Input type="text" labelName="ID" placeholder="ID" />
            <Input
              type="password"
              labelName="Password"
              placeholder="Password"
            />
          </section>
          <Divider />
          <section>
            <Button variant="outlined" fullWidth>
              Login
            </Button>
            <Button variant="contained" fullWidth>
              JOIN
            </Button>
          </section>
        </div>
      </div>
    </ContainerStyled>
  );
}
