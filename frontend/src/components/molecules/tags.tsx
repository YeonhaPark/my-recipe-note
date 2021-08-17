/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Chip, ChipColor } from '../atoms';
import { Autocomplete, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { TagType } from '../../api/types';

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
  tags: TagType[];
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
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
export default function Tags({ tags, setTags }: Props) {
  const classes = useStyles();

  const [currentTagValue, setCurrentTagValue] = useState('');
  const [tagLabels, setTagLabels] = useState<string[]>(['']);

  // const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     console.log('한번클릭했어여');
  //     const target = e.target as HTMLInputElement;
  //     const labelChipArr = tags.map((tag) => tag.label);
  //     if (!labelChipArr.includes(target.value)) {
  //       const randomColorIdx = Math.floor(Math.random() * colors.length);
  //       const randomColor: ChipColor = colors[randomColorIdx] as ChipColor;
  //       setTags([...tags, { label: target.value, color: randomColor }]);
  //     }
  //   }
  // }; 삭제해도될듯?

  const handleChange = (e: object, value: string[], reason: string) => {
    if (reason === 'clear') {
      setTags([]);
    }
    setTagLabels(value);
  };

  useEffect(() => {
    setTagLabels(tags.map((tag) => tag.label));
  }, [tags]);

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
        options={tags.map((option) => option.label)}
        freeSolo
        value={tagLabels}
        renderTags={(value, getTagProps) => {
          const newTags = value.map((val: string, index: number) => {
            return {
              label: val,
              color: colors[index] as ChipColor,
            };
          });
          const chips = newTags.map((tag: TagType, index: number) => (
            <Chip
              {...getTagProps({ index })}
              key={tag.label}
              color={tag.color}
              variant="filled"
              label={tag.label}
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
