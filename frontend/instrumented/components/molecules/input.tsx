/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Input as MInput, InputLabel } from '@material-ui/core';

interface Props {
  myRef: React.Ref<any>;
  labelName: string;
  type: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}
export default function Input({
  myRef,
  labelName,
  type,
  placeholder,
  required,
  autoComplete,
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
        autoComplete={autoComplete}
      />
    </div>
  );
}

Input.defaultProps = {
  required: false,
};
