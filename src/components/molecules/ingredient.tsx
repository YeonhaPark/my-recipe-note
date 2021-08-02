/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Checkbox } from '../atoms';

const checkboxStyle = css`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  input {
    border: 0;
  }
`;

interface Props {
  checked: boolean;
  onValueChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onListChange: (id: number, e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  idx: number;
}
export default function Ingredient({
  checked,
  onListChange,
  onCheckboxChange,
  onValueChange,
  value,
  idx,
}: Props) {
  return (
    <div css={checkboxStyle}>
      <label htmlFor="ingredient">
        <Checkbox
          id={idx}
          checked={checked}
          onCheckboxChange={onCheckboxChange}
          name={`checkbox_${idx + 1}`}
          color="primary"
        />
      </label>
      <input
        id={idx.toString()}
        type="text"
        value={value}
        onKeyDown={(e) => onListChange(idx, e)}
        onChange={(e) => onValueChange(idx, e)}
      />
    </div>
  );
}
