import { ReactNode } from 'react';
import { Button as MButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

interface Props {
  children: string | ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  fullWidth?: boolean;
  style?: any;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
}

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
  },
})(MButton);

export default function Button({
  children,
  color,
  variant,
  fullWidth,
  style,
}: Props): JSX.Element {
  return (
    <CustomButton
      color={color}
      style={style}
      variant={variant}
      fullWidth={fullWidth}
    >
      {children}
    </CustomButton>
  );
}

Button.defaultProps = {
  style: {},
  fullWidth: false,
  color: 'inherit',
  variant: 'text',
};
