export interface Ingredient {
  id: number;
  name: string;
}

export interface Tag {
  color: string;
  label: string;
}

export interface Recipes {
  id: string;
  title: string;
  ingredients: Ingredient[];
  contents: string;
  tags: Tag[];
  createdAt: Date;
  modifiedAt: Date;
}
