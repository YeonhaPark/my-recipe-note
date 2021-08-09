import { shallow } from 'enzyme';
import { Button } from '../atoms';
import renderer from 'react-test-renderer';

describe('button', () => {
  it('renders Button', () => {
    shallow(<Button children="button" />);
  });

  it('renders children', () => {
    const button = shallow(<Button children="Hi my name is button" />);
    expect(button.text()).toEqual('Hi my name is button');
  });

  it('match snapshot', () => {
    const tree = renderer.create(<Button children="button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
