/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ReactNode } from 'react';
import { Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
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
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

interface Props {
  children: ReactNode;
  headerName: string;
}
export default function AuthTemplate({ children, headerName }: Props) {
  return (
    <ContainerStyled>
      <div css={horizontallyCentered}>
        <Grid item xs={6}>
          <header css={headerStyle}>
            <div>{headerName}</div>
          </header>
          {children}
        </Grid>
      </div>
    </ContainerStyled>
  );
}
