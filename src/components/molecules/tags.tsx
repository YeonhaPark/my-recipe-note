/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Chip, ChipType, ChipColor } from '../atoms';
import { Autocomplete, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

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
  setTag: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  tagList: ChipType[];
  setTagList: React.Dispatch<React.SetStateAction<ChipType[]>>;
}
const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'default',
  'error',
  'info',
] as unknown as ChipColor;
export default function Tags({ setTag, tag, tagList, setTagList }: Props) {
  const classes = useStyles();

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const labelChipArr = tagList.map((tag) => tag.label);
      if (!labelChipArr.includes(target.value)) {
        const randomColorIdx = Math.floor(Math.random() * colors.length);
        const randomColor: ChipColor = colors[randomColorIdx] as ChipColor;
        setTagList([...tagList, { label: target.value, color: randomColor }]);
      } else {
      }
    }
  };

  const handleChange = (event: object, value: string[], reason: string) => {
    if (reason === 'clear') {
      setTagList([]);
    }
  };
  return (
    <div css={tagStyle}>
      <Autocomplete
        className={classes.root}
        onChange={handleChange}
        multiple
        id="tags-standard"
        options={tagList.map((option) => option.label)}
        defaultValue={undefined}
        freeSolo
        renderTags={(value, getTagProps) => {
          const newValues = value.map((val: string, index: number) => {
            return {
              label: val,
              color: colors[index] as ChipColor,
            };
          });
          const chips = newValues.map((tag: ChipType, index: number) => (
            <Chip
              color={tag.color}
              variant="filled"
              label={tag.label}
              {...getTagProps({ index })}
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
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={() => setTag}
            value={tag}
            onKeyDown={addTag}
            variant="standard"
            label="Add tags"
          />
        )}
      />
    </div>
  );
}
