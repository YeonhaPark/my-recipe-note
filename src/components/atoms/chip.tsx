/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Chip, ChipPropsColorOverrides } from '@material-ui/core';
import { OverridableStringUnion } from '@material-ui/types';

export type ChipColor = OverridableStringUnion<
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning',
  ChipPropsColorOverrides
>;
export interface ChipType {
  label: string;
  color: ChipColor;
  variant?: 'outlined' | 'filled' | undefined;
}
export default function CustomChip({
  label,
  color,
  variant = 'filled',
}: ChipType): JSX.Element {
  return (
    <span
      css={css`
        margin-right: 0.25rem;
      `}
    >
      <Chip label={label || ''} color={color} variant={variant} />
    </span>
  );
}

CustomChip.defaultChipType = {
  variant: 'filled',
};
