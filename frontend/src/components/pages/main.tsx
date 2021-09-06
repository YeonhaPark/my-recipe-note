/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
import { Drawer, Note } from '../organisms';
import { apiProvider } from '../../api/providers';
import {
  IngredientType,
  PostRecipeType,
  GetRecipeType,
  TagType,
} from '../../api/types';

const mainStyle = css`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

const drawerClosed = css`
  height: 100vh;
`;

export default function Main(): JSX.Element {
  const methods = useForm({
    defaultValues: {
      title: '',
      contents: '',
      ingredients: [{ isChecked: false, name: '' }] as IngredientType[],
    },
  });

  const [recipeList, setRecipeList] = useState<GetRecipeType[]>([]);
  const [recipeID, setRecipeID] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [searchWords, setSearchWords] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWords(e.target.value);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };
  const handleSearchClick = async () => {
    await getAllPosts(searchWords);
  };

  const getAllPosts = async (title?: string) => {
    try {
      if (title) {
        const result = await apiProvider.getAll(`recipes?title=${title}`);
        setRecipeList(result);
      } else {
        const result = await apiProvider.getAll('recipes');
        setRecipeList(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNew = () => {
    methods.reset();
    setRecipeID('');
    setTags([]);
  };

  const handleUpload = async (data: PostRecipeType) => {
    try {
      if (recipeID) {
        await apiProvider.put(`recipes/${recipeID}`, data);
      } else {
        await apiProvider.post('recipes', data);
        await getAllPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiProvider.remove('recipes', recipeID);
      await getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecipeClick = async (recipeId: string) => {
    try {
      const result = await apiProvider.getSingle('recipes', recipeId);
      const { title, ingredients, contents } = result;
      setRecipeID(result.id);
      methods.setValue('title', title);
      methods.setValue('contents', contents);
      methods.setValue('ingredients', ingredients);
      const tagsList = result.tags.map((tag: TagType) => tag.title);
      setTags(tagsList);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (recipeList[0]) handleRecipeClick(recipeList[0].id);
  }, [recipeList]);

  return (
    <FormProvider {...methods}>
      <div css={drawerOpen ? mainStyle : drawerClosed}>
        <Drawer
          drawerOpen={drawerOpen}
          onCreateNew={handleCreateNew}
          recipeList={recipeList}
          onRecipeClick={handleRecipeClick}
          searchWords={searchWords}
          onSearch={handleSearch}
          onSearchClick={handleSearchClick}
        />
        <Note
          drawerOpen={drawerOpen}
          onExpandClick={handleDrawerOpen}
          onUpload={handleUpload}
          onDelete={handleDelete}
          tags={tags}
          setTags={setTags}
        />
      </div>
    </FormProvider>
  );
}
