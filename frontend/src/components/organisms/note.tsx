/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState, Dispatch, SetStateAction } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { TextField, Input, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Button } from '../atoms';
import { GetRecipeType } from '../../api/types';
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
  drawerOpen: boolean;
  onExpandClick: () => void;
  onUpload: (data: GetRecipeType) => void;
  onDelete: () => void;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

// UPLOAD or CREATE
export default function Note({
  drawerOpen,
  onExpandClick,
  onUpload,
  onDelete,
  tags,
  setTags,
}: Props): JSX.Element {
  const { register, handleSubmit } = useFormContext();
  const {
    fields: ingredientFields,
    append,
    remove,
  } = useFieldArray({
    name: 'ingredients',
  });
  const history = useHistory();
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

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const onSubmit = (data: any) => {
    const titledTags = tags.map((tag) => {
      return { title: tag };
    });
    const dataToSend = { ...data, tags: titledTags };
    onUpload(dataToSend);
  };

  return (
    <main css={mainStyle}>
      <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
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
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
            <Button
              data-test="upload-btn"
              style={{ marginLeft: '0.5rem' }}
              color="secondary"
              variant="contained"
              type="submit"
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
            {...register('title')}
            data-test="title"
            classes={titleStyle}
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
          {ingredientFields.map((ingredient, idx) => {
            return (
              <Ingredient
                idx={idx}
                data-test="ingredients"
                key={ingredient.id}
                onAdd={() => append({ isChecked: false, name: '' })}
                onRemove={() => remove(idx)}
              />
            );
          })}
        </div>
        <div css={contentStyle}>
          <div css={commonTitleStyle}>
            <span>Contents</span>
          </div>
          <div data-test="contents" css={contentTextFieldStyle}>
            <TextField
              {...register('contents')}
              id="content"
              multiline
              fullWidth
            />
          </div>
          <Tags tags={tags} setTags={setTags} />
        </div>
      </form>
    </main>
  );
}
