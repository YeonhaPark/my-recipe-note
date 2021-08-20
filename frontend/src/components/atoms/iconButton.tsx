import React, { ReactNode, MouseEvent } from 'react';
import {
  IconButton,
  IconButtonTypeMap,
  IconButtonProps,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

interface Props {
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
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const MIconButton = <
  D extends React.ElementType = IconButtonTypeMap['defaultComponent'],
  P = {},
>(
  props: IconButtonProps<D, P>,
) => {
  return <IconButton {...props} />;
};

const CustomIcon = withStyles({
  root: {
    boxShadow: 'none',
  },
})(MIconButton);

export default function CustomIconButton({
  onClick,
  children,
  color,
}: Props): JSX.Element {
  return (
    <CustomIcon onClick={onClick} color={color}>
      {children}
    </CustomIcon>
  );
}

CustomIconButton.defaultProps = {
  style: {},
  fullWidth: false,
  color: 'inherit',
  variant: 'text',
};
