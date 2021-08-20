import { shallow } from 'enzyme';
import { IconButton } from '../atoms';
import renderer from 'react-test-renderer';

describe('IconButton', () => {
  it('renders IconButton', () => {
    shallow(<IconButton children="IconButton" />);
  });

  it('renders children', () => {
    const iconButton = shallow(
      <IconButton children="Hi my name is IconButton" />,
    );
    expect(iconButton.text()).toEqual('Hi my name is IconButton');
  });
});
