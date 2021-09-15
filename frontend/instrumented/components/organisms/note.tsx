/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField, Input, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Button } from '../atoms';
import { IngredientType, Mode } from '../../api/types';
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

interface Props {
  mode: Mode;
  drawerOpen: boolean;
  onExpandClick: () => void;
  onUpload: () => void;
  onDelete: () => void;
  recipeID: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  ingredients: IngredientType[];
  setIngredients: Dispatch<SetStateAction<IngredientType[]>>;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

// UPLOAD or CREATE
export default function Note({
  mode,
  drawerOpen,
  onExpandClick,
  onUpload,
  onDelete,
  recipeID,
  title,
  setTitle,
  contents,
  setContents,
  ingredients,
  setIngredients,
  tags,
  setTags,
}: Props): JSX.Element {
  const titleStyle = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleBurgerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleIngredientsList = (
    ingredientId: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key, currentTarget } = e;
    switch (key) {
      case 'Enter':
        if (currentTarget.value === '') break;
        let newIngredientsList;
        const elemIdx = ingredients.indexOf(ingredients[ingredientId - 1]);
        if (elemIdx !== -1) {
          const newElem = {
            id: elemIdx + 2,
            isChecked: false,
            name: '',
          } as IngredientType;
          newIngredientsList = ingredients
            .slice(0, elemIdx + 1)
            .concat([newElem])
            .concat(
              ingredients.slice(elemIdx + 1).map((ingredient) => {
                return { ...ingredient, id: ingredient.id + 1 };
              }),
            );
        } else {
          newIngredientsList = [
            ...ingredients,
            {
              id: ingredientId + 1,
              isChecked: false,
              name: '',
            },
          ];
        }
        setIngredients(newIngredientsList);

        setIngredients(newIngredientsList);
        break;
      case 'Backspace':
        if (currentTarget.value === '') {
          const filteredIngredientsList = ingredients.filter(
            (ingredient) => ingredient.id !== ingredientId,
          );
          setIngredients(filteredIngredientsList);
        }
        break;
      default:
        break;
    }
  };

  const handleValueChange =
    (type: string) =>
    (ingredientId: number, { target }: ChangeEvent<HTMLInputElement>) => {
      const copiedIngredientsList = [...ingredients];

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

      setIngredients(copiedIngredientsList);
    };

  return (
    <main css={noteStyle}>
      <header css={headerStyle}>
        <IconButton color="basic" onClick={onExpandClick}>
          {drawerOpen ? (
            <FontAwesomeIcon data-test="fa-expand" icon={faExpandAlt} />
          ) : (
            <FontAwesomeIcon data-test="fa-compress" icon={faCompressAlt} />
          )}
        </IconButton>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <IconButton
            data-test="simple-menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleBurgerClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            data-test="menu-burger"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Favorite</MenuItem>
            <MenuItem data-test="delete-btn" onClick={handleDelete}>
              Delete
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
          <Button
            data-test="upload-btn"
            style={{ marginLeft: '0.5rem' }}
            onClick={onUpload}
            color="secondary"
            variant="contained"
          >
            Upload
          </Button>
        </div>
      </header>
      <div css={commonInputStyle}>
        <div css={commonTitleStyle}>
          <span>Recipe title</span>
        </div>
        <Input
          data-test="title"
          classes={titleStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          fullWidth
          required
          autoFocus
        />
      </div>
      <div css={commonInputStyle}>
        <div css={commonTitleStyle}>
          <span>Ingredients</span>
        </div>
        {ingredients.map((ingredient) => (
          <Ingredient
            data-test="ingredients"
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
        <div data-test="contents" css={contentTextFieldStyle}>
          <TextField
            id="content"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            multiline
            fullWidth
          />
        </div>
        <Tags tags={tags} setTags={setTags} />
      </div>
    </main>
  );
}
