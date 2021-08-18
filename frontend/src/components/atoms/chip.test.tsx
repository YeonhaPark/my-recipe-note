import { mount } from 'enzyme';
import { Chip, ChipColor } from '../atoms';
import renderer from 'react-test-renderer';

const chipProps = {
  label: 'korean',
  color: 'info' as ChipColor,
};

const renderChip = () => mount(<Chip {...chipProps} />);

describe('Chip', () => {
  it('renders Chip', () => {
    renderChip();
  });

  it('renders label passed from parent', () => {
    const chip = renderChip();
    chip.setProps({ label: 'chinese' });
    expect(chip.text()).toEqual('chinese');
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Chip {...chipProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
