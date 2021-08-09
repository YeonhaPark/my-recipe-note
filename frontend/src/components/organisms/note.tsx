/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button, ChipType } from '../atoms';
import { Ingredient, Tags, IngredientType } from '../molecules';

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

export default function Note(): JSX.Element {
  const titleStyle = useStyles();

  const [title, setTitle] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<IngredientType[]>([
    { id: 1, isChecked: false, name: 'beer' },
    { id: 2, isChecked: true, name: 'carrot' },
  ]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [contents, setContents] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tagList, setTagList] = useState<ChipType[]>([]);

  const handleIngredientsList = (
    ingredientId: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key, currentTarget } = e;
    switch (key) {
      case 'Enter':
        if (currentTarget.value === '') break;
        let newIngredientsList;
        const elemIdx = ingredientsList.indexOf(
          ingredientsList[ingredientId - 1],
        );
        console.log('elem idx:', elemIdx);
        if (elemIdx !== -1) {
          const newElem = {
            id: elemIdx + 2,
            isChecked: false,
            name: '',
          } as IngredientType;
          newIngredientsList = ingredientsList
            .slice(0, elemIdx + 1)
            .concat([newElem])
            .concat(
              ingredientsList.slice(elemIdx + 1).map((ingredient) => {
                return { ...ingredient, id: ingredient.id + 1 };
              }),
            );
        } else {
          newIngredientsList = [
            ...ingredientsList,
            {
              id: ingredientId + 1,
              isChecked: false,
              name: '',
            },
          ];
        }
        setIngredientsList(newIngredientsList);

        setCurrentFocus(ingredientId + 1);
        setIngredientsList(newIngredientsList);
        break;
      case 'Backspace':
        if (currentTarget.value === '') {
          const filteredIngredientsList = ingredientsList.filter(
            (ingredient) => ingredient.id !== ingredientId,
          );
          setCurrentFocus(ingredientId - 1);
          setIngredientsList(filteredIngredientsList);
        }
        break;
      default:
        break;
    }
  };

  const handleValueChange =
    (type: string) =>
    (ingredientId: number, { target }: ChangeEvent<HTMLInputElement>) => {
      const copiedIngredientsList = [...ingredientsList];

      switch (type) {
        case 'text':
          copiedIngredientsList[ingredientId - 1].name = target.value;
          break;
        case 'checkbox':
          copiedIngredientsList[ingredientId - 1].isChecked = target.checked;
          break;
        default:
          break;
      }

      setIngredientsList(copiedIngredientsList);
    };

  useEffect(() => {
    document.getElementById(currentFocus.toString())?.focus();
  }, [currentFocus]);

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
            data-testid={`ingredient-${ingredient.id}`}
            key={ingredient.id}
            checked={ingredient.isChecked}
            value={ingredient.name}
            onListChange={handleIngredientsList}
            onValueChange={handleValueChange('text')}
            onCheckboxChange={handleValueChange('checkbox')}
            ingredientId={ingredient.id}
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
      </div>
    </main>
  );
}
