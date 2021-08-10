/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect } from 'react';
import { Drawer, Note } from '../organisms';
import { apiProvider } from '../../api/providers';

const mainStyle = css`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

export default function Main(): JSX.Element {
  const getAllPosts = async () => {
    try {
      const result = await apiProvider.getAll('posts');
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div css={mainStyle}>
      <Drawer />
      <Note />
    </div>
  );
}
