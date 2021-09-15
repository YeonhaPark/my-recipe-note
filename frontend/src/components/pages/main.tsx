/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Drawer, Note } from '../organisms';
import { apiProvider } from '../../api/providers';
import {
  IngredientType,
  PostRecipeType,
  GetRecipeResult,
  TagType,
  GetTagResult,
} from '../../api/types';
import { removeEmptyVals } from '../../util/func';

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

  const history = useHistory();
  const [recipeList, setRecipeList] = useState<GetRecipeResult[]>([]);
  const [recipeID, setRecipeID] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<GetTagResult[]>([]);
  const [searchWords, setSearchWords] = useState<string>('');
  const [searchTag, setSearchTag] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWords(e.target.value);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  const getAllTags = useCallback(async () => {
    try {
      const query = removeEmptyVals({ title: searchWords });
      const tags = await apiProvider.getTags('tags', query);
      setUserTags(tags);
    } catch (err) {
      alert(err);
      history.push('/login');
    }
  }, [searchWords]);

  // search condition이 업데이트 되는 조건: 유저가 서치 버튼을 눌렀을때, 태그 클릭했을 때
  const getAllPosts = useCallback(async () => {
    try {
      const searchConditions = {
        title: searchWords,
        tag: searchTag,
      };
      const refinedConditions = removeEmptyVals(searchConditions);
      const result = await apiProvider.getAll('recipes', refinedConditions);
      setRecipeList(result);
    } catch (err) {
      alert(err);
      history.push('/login');
    }
  }, [searchTag, searchWords]);

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
        await getAllTags();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiProvider.remove('recipes', recipeID);
      await getAllPosts();
      await getAllTags();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecipeClick = useCallback(
    async (recipeId: number) => {
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
    },
    [methods],
  );

  useEffect(() => {
    getAllPosts();
    getAllTags();
  }, [searchTag, getAllPosts, getAllTags]);

  useEffect(() => {
    if (recipeList && recipeList[0]) handleRecipeClick(recipeList[0].id);
  }, [handleRecipeClick, recipeList]);

  return (
    <FormProvider {...methods}>
      <div css={drawerOpen ? mainStyle : drawerClosed}>
        <Drawer
          setSearchTag={setSearchTag}
          searchTag={searchTag}
          drawerOpen={drawerOpen}
          onCreateNew={handleCreateNew}
          recipeList={recipeList}
          onRecipeClick={handleRecipeClick}
          searchWords={searchWords}
          onChange={handleChange}
          userTags={userTags}
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
