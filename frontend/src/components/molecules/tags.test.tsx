import { mount } from 'enzyme';
import { Tags } from '../molecules';

const TagsProps = {
  tags: ['korean', 'japanese'],
  setTags: () => {},
};

const renderTags = () => mount(<Tags {...TagsProps} />);

describe('Tags', () => {
  it('renders Tags', () => {
    renderTags();
  });

  it('renders exact prop provided', () => {
    const tags = renderTags();

    expect(tags.prop('tags')).toEqual(['korean', 'japanese']);
  });
});
