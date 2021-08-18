import { mount } from 'enzyme';
import { Input } from '.';
import renderer from 'react-test-renderer';

const InputProps = {
  type: 'password',
  labelName: 'Password',
  placeholder: 'Password',
  required: true,
};

const renderInput = () => mount(<Input {...InputProps} />);

describe('Input', () => {
  it('renders Input', () => {
    renderInput();
  });

  it('renders exact prop provided', () => {
    const input = renderInput();

    expect(input.prop('required')).toEqual(true);
  });

  it('changes required prop value', () => {
    const customInput = renderInput();
    customInput.setProps({ required: false });
    expect(customInput.prop('required')).toEqual(false);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Input {...InputProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
