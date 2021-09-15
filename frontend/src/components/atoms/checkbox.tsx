import { withStyles } from '@material-ui/styles';
import { Checkbox as MCheckbox } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

const CustomCheckbox = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})(MCheckbox);

interface Props {
  color: 'primary' | 'secondary';
  idx: number;
}

export default function Checkbox({ color, idx }: Props): JSX.Element {
  const { register } = useFormContext();

  return (
    <CustomCheckbox
      {...register(`ingredients.${idx}.isChecked`)}
      color={color}
    />
  );
}
