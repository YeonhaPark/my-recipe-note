import { withStyles } from '@material-ui/styles';
import { Checkbox as MCheckbox } from '@material-ui/core';

const CustomCheckbox = withStyles({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})(MCheckbox);

interface Props {
  id: number;
  checked: boolean;
  onCheckboxChange: (
    type: string,
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  name: string;
  color: 'primary' | 'secondary';
}
export default function Checkbox({
  id,
  checked,
  onCheckboxChange,
  name,
  color,
}: Props) {
  return (
    <CustomCheckbox
      checked={checked}
      onChange={(e) => onCheckboxChange('checkbox', id, e)}
      name={name}
      color={color}
    />
  );
}
