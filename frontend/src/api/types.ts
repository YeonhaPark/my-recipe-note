export type Mode = 'CREATE' | 'MODIFY';
export interface IngredientType {
  isChecked?: boolean;
  name: string;
}

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
