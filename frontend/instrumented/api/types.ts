export type Mode = 'CREATE' | 'MODIFY';
export interface IngredientType {
  id: number;
  isChecked?: boolean;
  name: string;
}
export interface RecipesType {
  id: string;
  title: string;
  ingredients: IngredientType[];
  contents: string;
  tags: string[];
  createdAt: Date;
  modifiedAt: Date;
}
