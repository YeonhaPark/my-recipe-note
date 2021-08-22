/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Input as MInput, InputLabel } from '@material-ui/core';
import { RefObject } from 'react';

interface Props {
  myRef: React.Ref<string>;
  labelName: string;
  type: string;
  placeholder: string;
  required?: boolean;
}
export default function Input({
  myRef,
  labelName,
  type,
  placeholder,
  required,
}: Props) {
  return (
    <div
      css={css`
        margin-bottom: 1.5rem;
      `}
    >
      <InputLabel htmlFor={labelName}>{labelName}</InputLabel>
      <MInput
        inputRef={myRef}
        type={type}
        id={labelName}
        fullWidth
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

Input.defaultProps = {
  required: false,
};
