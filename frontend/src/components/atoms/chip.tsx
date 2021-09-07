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
  isActive?: boolean;
  label: string;
  color: ChipColor;
  variant?: 'outlined' | 'filled' | undefined;
  onClick?: () => void;
}

export default function CustomChip({
  isActive = false,
  label,
  color,
  variant = 'filled',
  onClick,
}: ChipType): JSX.Element {
  const defaultStyle = 'margin-right: 0.25rem;';
  const activeStyle = '> div.selected {border: 1px solid black;}';
  return (
    <span
      css={
        isActive
          ? css`
              ${defaultStyle} ${activeStyle}
            `
          : css`
              ${defaultStyle}
            `
      }
    >
      <Chip
        className="selected"
        onClick={onClick}
        label={label || ''}
        color={color}
        variant={variant}
      />
    </span>
  );
}

CustomChip.defaultChipType = {
  variant: 'filled',
};
