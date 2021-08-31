import { shallow } from 'enzyme';
import { Checkbox } from '../atoms';

const checkboxProps = {
  id: 1,
  checked: false,
  onCheckboxChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => {},
  name: 'carrot',
  color: 'primary' as 'primary',
};

const renderCheckbox = () => shallow(<Checkbox {...checkboxProps} />);

describe('Checkbox', () => {
  beforeEach(() => {
    const button = renderCheckbox();
    button.setProps({ checked: false });
  });

  it('check/unchecked when change event called', () => {
    const button = renderCheckbox();
    button.setProps({ checked: true });
    expect(button.prop('checked')).toEqual(true);
  });
});
