/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Chip, ChipColor } from '../atoms';
import { Autocomplete, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { chipColors } from '../../api/types';

const tagStyle = css`
  font-size: 0.75rem;
  flex: 0 1 1.5rem;
`;
const useStyles = makeStyles({
  root: {
    padding: '0.25rem 0',
  },
});

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Tags({ tags, setTags }: Props) {
  const classes = useStyles();

  const [currentTagValue, setCurrentTagValue] = useState('');

  const handleChange = (e: object, value: string[], reason: string) => {
    if (reason === 'clear') {
      setTags([]);
    }
    setTags(value);
  };

  useEffect(() => {
    const event = new Event('change', {
      bubbles: true,
    });
    const node = document.getElementById('tags-standard');
    node && node.dispatchEvent(event);
  }, []);

  return (
    <div css={tagStyle}>
      <Autocomplete
        className={classes.root}
        onChange={handleChange}
        multiple
        id="tags-standard"
        options={tags}
        freeSolo
        value={tags}
        renderTags={(value, getTagProps) => {
          const chips = value.map((label: string, index: number) => (
            <Chip
              {...getTagProps({ index })}
              key={label}
              color={chipColors[index] as ChipColor}
              variant="filled"
              label={label}
            />
          ));
          return (
            <div
              css={css`
                margin: 0.25rem auto;
              `}
            >
              {chips}
            </div>
          );
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              onChange={() => setCurrentTagValue}
              value={currentTagValue}
              variant="standard"
              label="Add tags"
            />
          );
        }}
      />
    </div>
  );
}
