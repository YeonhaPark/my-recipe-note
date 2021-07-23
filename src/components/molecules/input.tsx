/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Input as MInput, InputLabel } from '@material-ui/core';

interface Props {
  labelName: string;
  type: string;
  placeholder: string;
}
export default function Input({ labelName, type, placeholder }: Props) {
  return (
    <div
      css={css`
        margin-bottom: 1.5rem;
      `}
    >
      <InputLabel htmlFor={labelName}>{labelName}</InputLabel>
      <MInput type={type} id={labelName} fullWidth placeholder={placeholder} />
    </div>
  );
}
