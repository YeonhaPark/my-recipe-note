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
  checked: boolean | undefined;
  onValueChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  onListChange: (id: number, e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  ingredientId: number;
}
export default function Ingredient({
  checked,
  onListChange,
  onCheckboxChange,
  onValueChange,
  value,
  ingredientId,
}: Props) {
  return (
    <div css={checkboxStyle}>
      <Checkbox
        id={ingredientId}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
        name={`checkbox-${ingredientId}`}
        color="primary"
      />
      <input
        id={`input-${ingredientId.toString()}`}
        type="text"
        value={value}
        onKeyDown={(e) => onListChange(ingredientId, e)}
        onChange={(e) => onValueChange(ingredientId, e)}
      />
    </div>
  );
}
