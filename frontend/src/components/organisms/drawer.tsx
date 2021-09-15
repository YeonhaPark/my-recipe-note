/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState, ChangeEvent } from 'react';
import {
  Drawer as MDrawer,
  List,
  ListItem,
  ListItemText,
  Input,
} from '@material-ui/core';
import { GetRecipeResult, GetTagResult, chipColors } from '../../api/types';
import { makeStyles } from '@material-ui/styles';
import { NoteAdd, Search, NavigateBefore } from '@material-ui/icons';
import { Chip, ChipColor, IconButton } from '../atoms';
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
  height: 240px;
`;
const tagSectionStyle = css`
  height: 2.5rem;
  display: flex;
  align-items: center;
  margin: 0 0.75rem 0.5rem;
  border-bottom: 1px solid ${gray};
`;

const chipSectionStyle = css`
  padding: 0 0.5rem;
`;

interface Props {
  drawerOpen: boolean;
  onCreateNew: () => void;
  recipeList: GetRecipeResult[];
  onRecipeClick: (id: number) => void;
  searchWords: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchTag: React.Dispatch<React.SetStateAction<string>>;
  searchTag: string;
  userTags: GetTagResult[];
}

export default function Drawer({
  drawerOpen,
  onCreateNew,
  recipeList,
  onRecipeClick,
  searchWords,
  onChange,
  setSearchTag,
  searchTag,
  userTags,
}: Props) {
  const searchStyle = useStyles();

  const [isChipActive, setIsChipActive] = useState<boolean>(false);

  const handleChipClick = (label: string) => {
    setSearchTag(label);
    setIsChipActive((prev) => !prev);
  };

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
              type="reset"
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
          onChange={onChange}
          fullWidth
        />
        <Search />
      </div>
      <List>
        {recipeList && recipeList.length
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
        <div css={chipSectionStyle}>
          {isChipActive && (
            <IconButton
              onClick={() => {
                setIsChipActive((prev) => !prev);
                setSearchTag('');
              }}
            >
              <NavigateBefore />
            </IconButton>
          )}
          {searchTag ? (
            <Chip isActive variant="filled" color="warning" label={searchTag} />
          ) : userTags.length ? (
            userTags.map((tag, idx) => (
              <Chip
                key={tag.id}
                isActive={isChipActive}
                onClick={() => handleChipClick(tag.title)}
                variant="filled"
                color={chipColors[idx] as ChipColor}
                label={tag.title}
              />
            ))
          ) : null}
        </div>
      </section>
    </MDrawer>
  );
}
