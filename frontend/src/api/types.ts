import { ChipColor } from '../components/atoms/chip';

export type Mode = 'CREATE' | 'MODIFY';
export interface IngredientType {
  isChecked?: boolean;
  name: string;
}

export const chipColors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'default',
  'error',
  'info',
] as unknown as ChipColor;
export interface TagType {
  title: string;
}
export interface PostRecipeType {
  title: string;
  ingredients: IngredientType[];
  contents: string;
  tags: TagType[];
}
export interface GetRecipeType {
  id: string;
  title: string;
  ingredients: IngredientType[];
  contents: string;
  tags: TagType[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface GetTagResult {
  id: number;
  title: string;
}

export interface GetRecipeParams {
  title?: string;
  tag?: string;
}
export interface RecipeIngredient {
  createdAt: Date;
  updatedAt: Date;
  recipeId: number;
  ingredientId: number;
}

export interface Ingredient {
  id: number;
  isChecked: boolean;
  name: string;
  RecipeIngredient: RecipeIngredient;
}

export interface RecipeTag {
  createdAt: Date;
  updatedAt: Date;
  tagId: number;
  recipeId: number;
}

export interface Tag {
  id: number;
  title: string;
  RecipeTag: RecipeTag;
}

export interface GetRecipeResult {
  id: number;
  title: string;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  ingredients: Ingredient[];
  tags: Tag[];
}
