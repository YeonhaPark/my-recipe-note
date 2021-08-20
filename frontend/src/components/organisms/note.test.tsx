import { mount, shallow } from 'enzyme';
import { Note } from '../organisms';
import { Mode } from '../../api/types';
import { Dispatch, SetStateAction } from 'react';
import { ChipColor } from '../atoms/chip';
import renderer from 'react-test-renderer';

const NoteProps = {
  mode: 'CREATE' as Mode,
  drawerOpen: true,
  onExpandClick: () => {},
  onUpload: () => {},
  onDelete: () => {},
  recipeID: '1',
  title: 'taco',
  setTitle: () => {},
  ingredients: [{ id: 1, isChecked: true, name: 'sugar' }],
  setIngredients: () => {},
  contents: 'contents',
  setContents: () => {},
  tags: [{ color: 'error' as ChipColor, label: 'sweet' }],
  setTags: () => {},
};

const renderNote = () => shallow(<Note {...NoteProps} />);
const note = renderNote();
describe('Note', () => {
  it('renders Note', () => {
    renderNote();
  });

  it('renders fa-expand icon', () => {
    expect(note.find("[data-test='fa-expand']").length).toBe(1);
  });

  it('renders menu icon', () => {
    expect(note.find("[data-test='simple-menu']").length).toBe(1);
  });

  it('renders Upload button', () => {
    expect(note.find("[data-test='upload-btn']").length).toBe(1);
  });

  it('renders Ingredients', () => {
    expect(note.find("[data-test='ingredients']").length).toBe(1);
  });
  it('renders contents', () => {
    expect(note.find("[data-test='contents']").length).toBe(1);
  });

  it('contains title input element', () => {
    expect(note.find("[data-test='title']").length).toBe(1);
  });

  it('confirms if title input element has required props', () => {
    expect(note.find("[data-test='title']").prop('required')).toBe(true);
  });
});
