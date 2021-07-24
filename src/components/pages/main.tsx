/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Drawer, Note } from '../organisms';

const mainStyle = css`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

export default function Main(): JSX.Element {
  return (
    <div css={mainStyle}>
      <Drawer />
      <Note />
    </div>
  );
}
