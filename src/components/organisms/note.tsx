/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import {
  TextField,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Checkbox,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import { Button } from '../atoms';
import { black } from '../../theme/colors';

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
  div:first-of-type {
    margin-bottom: 0.5rem;
  }
`;

const contentTextFieldStyle = css`
  height: 100%;
  div {
    height: 100%;
  }
`;
const tagStyle = css`
  font-size: 0.75rem;
  flex: 0 1 1.5rem;
`;
export default function Note(): JSX.Element {
  const searchStyle = useStyles();

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
          classes={searchStyle}
          type="text"
          placeholder="Type here"
          fullWidth
        />
      </div>
      <div css={commonInputStyle}>
        <div css={commonTitleStyle}>
          <span>Ingredients</span>
        </div>
        <div css={checkboxStyle}>
          <label htmlFor="ingredient">
            <Checkbox
              defaultChecked={true}
              // onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          </label>
          <input id="ingredient" type="text" />
        </div>
      </div>
      <div css={contentStyle}>
        <div css={commonTitleStyle}>
          <span>Contents</span>
        </div>
        <div css={contentTextFieldStyle}>
          <TextField id="content" fullWidth />
        </div>
        <div css={tagStyle}>
          <TextField id="tag" label="Add tag..." fullWidth />
        </div>
      </div>
    </main>
  );
}
