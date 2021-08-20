import { mount } from 'enzyme';
import { Tags } from '../molecules';
import renderer from 'react-test-renderer';
import { ChipColor } from '../atoms';

const TagsProps = {
  tags: [
    {
      label: 'korean',
      color: 'info' as ChipColor,
    },
    {
      label: 'japanese',
      color: 'error' as ChipColor,
    },
  ],
  setTags: () => {},
};

const renderTags = () => mount(<Tags {...TagsProps} />);

describe('Tags', () => {
  it('renders Tags', () => {
    renderTags();
  });

  it('renders exact prop provided', () => {
    const tags = renderTags();

    expect(tags.prop('tags')).toEqual([
      {
        label: 'korean',
        color: 'info' as ChipColor,
      },
      {
        label: 'japanese',
        color: 'error' as ChipColor,
      },
    ]);
  });
});
