/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button, ChipType } from '../atoms';
import { Ingredient, Tags } from '../molecules';

const useStyles = makeStyles({
  root: {
    height: '3rem',
  },
});

const noteStyle = css`
  padding: 0 1rem 0.75rem;
  display: flex;
  flex-flow: column;
`;

const headerStyle = css`
  position: relative;
  padding: 0 0.75rem;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex: 0 1 3rem;
`;

const commonInputStyle = css`
  margin-bottom: 1.5rem;
`;

const commonTitleStyle = css`
  display: flex;
  span {
    white-space: nowrap;
  }
`;

const contentStyle = css`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  padding-bottom: 0.75rem;
  > div:first-of-type {
    margin-bottom: 0.5rem;
  }
`;

const contentTextFieldStyle = css`
  height: 100%;
  div {
    height: 100%;
    textarea {
      align-self: flex-start;
    }
  }
`;

export type IngredientType = {
  id: number;
  isChecked: boolean;
  name: string;
  focused: boolean;
};
export default function Note(): JSX.Element {
  const titleStyle = useStyles();

  const [title, setTitle] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<IngredientType[]>([
    { id: 1, isChecked: false, name: 'beer', focused: false },
    { id: 2, isChecked: true, name: 'carrot', focused: false },
  ]);
  const [contents, setContents] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tagList, setTagList] = useState<ChipType[]>([]);

  const addIngredients = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newIngredientsList = [
        ...ingredientsList,
        {
          id: ingredientsList[ingredientsList.length - 1].id + 1,
          isChecked: false,
          name: '',
          focused: true,
        },
      ];
      setIngredientsList(newIngredientsList);
    }
  };

  const handleValueChange =
    (stateSetter: React.Dispatch<React.SetStateAction<IngredientType[]>>) =>
    (type: string, id: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const copiedIngredientsList = [...ingredientsList];
      const selectedCheckbox = ingredientsList.filter(
        (checkbox) => checkbox.id === id,
      );
      switch (type) {
        case 'value':
          selectedCheckbox[0].name = e.target.value;
          break;
        case 'checkbox':
          selectedCheckbox[0].isChecked = e.target.checked;
          break;
        default:
          break;
      }
      const ingredientIdx = ingredientsList.indexOf(selectedCheckbox[0]);
      copiedIngredientsList[ingredientIdx] = selectedCheckbox[0];
      stateSetter(copiedIngredientsList);
    };

  return (
    <main css={noteStyle}>
      <header css={headerStyle}>
        <FontAwesomeIcon icon={faExpandAlt} />
        <Button color="secondary" variant="contained">
          Upload
        </Button>
      </header>
      <div css={commonInputStyle}>
        <div css={commonTitleStyle}>
          <span>Recipe title</span>
        </div>
        <Input
          classes={titleStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          fullWidth
        />
      </div>
      <div css={commonInputStyle}>
        <div css={commonTitleStyle}>
          <span>Ingredients</span>
        </div>
        {ingredientsList.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            isFocused={ingredient.focused}
            checked={ingredient.isChecked}
            value={ingredient.name}
            onEnter={addIngredients}
            onValueChange={handleValueChange(setIngredientsList)}
            id={ingredient.id}
          />
        ))}
      </div>
      <div css={contentStyle}>
        <div css={commonTitleStyle}>
          <span>Contents</span>
        </div>
        <div css={contentTextFieldStyle}>
          <TextField
            id="content"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            multiline
            fullWidth
          />
        </div>
        <Tags
          setTag={setTag}
          tag={tag}
          tagList={tagList}
          setTagList={setTagList}
        />
        {/* <input type="text" id="tag" value={tag} />
          {tagList.map((tag) => (
            <Chip key={tag.label} label={tag.label} color={tag.color} />
          ))} */}
      </div>
    </main>
  );
}
