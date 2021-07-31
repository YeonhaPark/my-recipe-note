/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
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
  isFocused: boolean;
  checked: boolean;
  onValueChange: (
    type: string,
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  id: number;
}
export default function Ingredient({
  isFocused,
  checked,
  onEnter,
  onValueChange,
  value,
  id,
}: Props) {
  return (
    <div css={checkboxStyle}>
      <label htmlFor="ingredient">
        <Checkbox
          id={id}
          checked={checked}
          onCheckboxChange={onValueChange}
          name={`checkbox_${id}`}
          color="primary"
        />
      </label>
      <input
        autoFocus={isFocused}
        id="ingredient"
        type="text"
        value={value}
        onKeyDown={onEnter}
        onChange={(e) => onValueChange('text', id, e)}
      />
    </div>
  );
}
