import { ReactNode } from 'react';
import { Button as MButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

interface Props {
  children: string | ReactNode;
  variant: 'text' | 'contained' | 'outlined';
  fullWidth: boolean;
  style?: any;
}

const CustomButton = withStyles({
  root: {
    boxShadow: 'none',
    marginBottom: '1.5rem',
  },
})(MButton);

export default function Button({
  children,
  variant,
  fullWidth = false,
  style,
}: Props): JSX.Element {
  return (
    <CustomButton style={style} variant={variant} fullWidth={fullWidth}>
      {children}
    </CustomButton>
  );
}

Button.defaultProps = {
  style: {},
};
