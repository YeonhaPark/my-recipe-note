import { ChipColor } from '../components/atoms/chip';

export type Mode = 'CREATE' | 'MODIFY';
export interface IngredientType {
  id: number;
  isChecked?: boolean;
  name: string;
}

export interface TagType {
  color: ChipColor;
  label: string;
}

export interface RecipesType {
  id: string;
  title: string;
  ingredients: IngredientType[];
  contents: string;
  tags: TagType[];
  createdAt: Date;
  modifiedAt: Date;
}
