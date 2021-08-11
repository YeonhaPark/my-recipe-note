import { shallow } from 'enzyme';
import { Checkbox } from '../atoms';
import renderer from 'react-test-renderer';

const checkboxProps = {
  id: 1,
  checked: false,
  onCheckboxChange: (id: number, e: React.ChangeEvent<HTMLInputElement>) => {},
  name: 'carrot',
  color: 'primary' as 'primary',
};

const renderCheckbox = () => shallow(<Checkbox {...checkboxProps} />);

describe('Checkbox', () => {
  it('renders Checkbox', () => {
    renderCheckbox();
  });

  it('check/unchecked when change event called', () => {
    const button = renderCheckbox();
    button.setProps({ checked: true });
    expect(button.prop('checked')).toEqual(true);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Checkbox {...checkboxProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
