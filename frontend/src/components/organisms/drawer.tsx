/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ChangeEvent } from 'react';
import {
  Drawer as MDrawer,
  List,
  ListItem,
  ListItemText,
  Input,
} from '@material-ui/core';
import { RecipesType } from '../../api/types';
import { makeStyles } from '@material-ui/styles';
import { NoteAdd, Search } from '@material-ui/icons';
import { Chip, IconButton } from '../atoms';
import { gray } from '../../theme/colors';

const useStyles = makeStyles({
  root: {
    height: '3rem',
  },
});
const drawerWidth = 240;

const headerStyle = css`
  position: relative;
  padding: 0 0.75rem;
`;

const divider = css`
  height: 3rem;
  justify-content: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${gray};
`;

const addIconStyle = css`
  position: absolute;
  right: 0.75rem;
`;

const searchbarStyle = css`
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
`;

const sectionStyle = css`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-bottom: 2rem;
`;
const tagSectionStyle = css`
  height: 2.5rem;
  display: flex;
  align-items: center;
  margin: 0 0.75rem 0.5rem;
  border-bottom: 1px solid ${gray};
`;

interface Props {
  drawerOpen: boolean;
  onCreateNew: () => void;
  recipeList: RecipesType[];
  onRecipeClick: (id: string) => void;
  searchWords: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

export default function Drawer({
  drawerOpen,
  onCreateNew,
  recipeList,
  onRecipeClick,
  searchWords,
  onSearch,
  onSearchClick,
}: Props) {
  const searchStyle = useStyles();

  return (
    <MDrawer
      sx={{
        position: 'relative',
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
    >
      <header css={headerStyle}>
        <div css={divider}>
          All Recipes
          <div css={addIconStyle}>
            <IconButton
              onClick={onCreateNew}
              color="inherit"
              aria-label="create new recipe"
            >
              <NoteAdd />
            </IconButton>
          </div>
        </div>
      </header>
      <div css={searchbarStyle}>
        <Input
          classes={searchStyle}
          type="text"
          placeholder="Search..."
          value={searchWords}
          onChange={onSearch}
          fullWidth
        />
        <IconButton onClick={onSearchClick}>
          <Search />
        </IconButton>
      </div>
      <List>
        {recipeList.length
          ? recipeList.map((recipe) => (
              <ListItem
                data-test="list-item"
                button
                onClick={() => onRecipeClick(recipe.id)}
                key={recipe.id}
              >
                <ListItemText primary={recipe.title} />
              </ListItem>
            ))
          : null}
      </List>
      <section css={sectionStyle}>
        <div css={tagSectionStyle}>Tags</div>
        <div>
          <Chip variant="filled" color="warning" label="korean" />
        </div>
      </section>
    </MDrawer>
  );
}
