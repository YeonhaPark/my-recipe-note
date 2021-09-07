/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Checkbox, IconButton } from '../atoms';

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
  onAdd: () => void;
  onRemove: () => void;
  idx: number;
}
export default function Ingredient({ onAdd, onRemove, idx }: Props) {
  const { register } = useFormContext();
  return (
    <div css={checkboxStyle}>
      <Checkbox idx={idx} color="primary" />
      <input {...register(`ingredients.${idx}.name`)} type="text" />
      {idx > 0 && (
        <IconButton onClick={onRemove}>
          <RemoveCircleOutlineIcon color="secondary" />
        </IconButton>
      )}
      <IconButton onClick={onAdd}>
        <AddCircleOutlineIcon color="secondary" />
      </IconButton>
    </div>
  );
}
