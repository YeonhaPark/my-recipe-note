import { ReactNode } from 'react';
import {
  Button as MButton,
  ButtonTypeMap,
  ButtonProps,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const IButton = <
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {},
>(
  props: ButtonProps<D, P>,
) => {
  return <MButton {...props} />;
};
interface Props {
  onClick?: () => void;
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
    | 'basic'
    | undefined;
}

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
  },
})(IButton);

export default function Button({
  onClick,
  children,
  color,
  variant,
  fullWidth,
  style,
}: Props): JSX.Element {
  return (
    <CustomButton
      onClick={onClick}
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
