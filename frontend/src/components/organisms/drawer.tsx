/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import {
  Drawer as MDrawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Input,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NoteAdd } from '@material-ui/icons';
import { Chip } from '../atoms';
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

export default function Drawer() {
  const [open, setOpen] = useState<boolean>(true);

  const searchStyle = useStyles();
  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
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
      open
    >
      <header css={headerStyle}>
        <div css={divider}>
          All Recipes
          <div css={addIconStyle}>
            <IconButton color="inherit" aria-label="create new recipe">
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
          fullWidth
        />
      </div>
      <List>
        {['Mexican Taco', 'Sandwich', 'Seolleongtang'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
