/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Drawer, Editor } from '../organisms';

const mainStyle = css`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-gap: 1rem;
`;

export default function Main(): JSX.Element {
  return (
    <div css={mainStyle}>
      <Drawer />
      <Editor />
    </div>
  );
}
